import { Inject, Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { Clock } from '../common/clock.js';
import { conflict, DomainError } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { ENV, type Env } from '../config/env.js';
import { AuditService } from '../core/audit.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { DATABASE, type Database } from '../db/database.js';
import { branches, invoiceSeries, members, organizations, refreshTokens, staff, users, type StaffRole } from '../db/schema.js';
import type { AuthCtx, Role } from './context.js';
import { hashPassword, verifyPassword } from './password.js';
import { hashToken, newRefreshToken, signAccess } from './tokens.js';

export type Session = { accessToken: string; refreshToken: string; expiresIn: number; user: { id: string; name: string; phone: string; mustChangePassword: boolean }; org: { id: string; name: string }; roles: Role[]; branchIds: string[] | null; memberId: string | null; organizacoes: { id: string; name: string; roles: Role[] }[] };

/** Código da série de facturação a partir do nome da filial: "Talatona" → "TAL". */
export function branchCode(name: string, taken: Set<string>): string {
  const base = name
    .normalize('NFD')
    .replace(/[^\p{L}]/gu, '')
    .toUpperCase()
    .slice(0, 3)
    .padEnd(3, 'X');
  let code = base;
  for (let i = 2; taken.has(code); i++) code = `${base.slice(0, 2)}${i}`;
  taken.add(code);
  return code;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    @Inject(ENV) private readonly env: Env,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly outbox: OutboxService,
  ) {}

  /** RF-ORG-01 · cria o dono, a organização, as filiais e as séries de facturação do ano. */
  async registerGym(input: { owner: { name: string; phone: string; password: string }; gym: { name: string; nif?: string; city?: string; branches: string[] } }, device?: string): Promise<Session> {
    const userId = uuidv7();
    const orgId = uuidv7();
    const passwordHash = await hashPassword(input.owner.password);
    await this.database.system(async (tx) => {
      const [exists] = await tx.select({ id: users.id }).from(users).where(eq(users.phone, input.owner.phone));
      if (exists) throw conflict('TELEFONE_JA_REGISTADO', 'Este número já tem conta. Entre com a sua senha.');
      await tx.insert(users).values({ id: userId, phone: input.owner.phone, name: input.owner.name, passwordHash });
    });
    const year = Number(this.clock.today().slice(0, 4));
    await this.database.withOrg({ orgId, userId }, async (tx) => {
      await tx.insert(organizations).values({ id: orgId, name: input.gym.name, nif: input.gym.nif ?? null, city: input.gym.city ?? null });
      const taken = new Set<string>();
      for (const name of input.gym.branches) {
        const branchId = uuidv7();
        const code = branchCode(name, taken);
        await tx.insert(branches).values({ id: branchId, orgId, name, code });
        for (const docType of ['FR', 'FT', 'NC'] as const) {
          await tx.insert(invoiceSeries).values({ id: uuidv7(), orgId, branchId, docType, year, code: `${code}${year}` });
        }
      }
      await tx.insert(staff).values({ id: uuidv7(), orgId, userId, role: 'dono', branchIds: null });
      await this.audit.record(tx, { orgId, userId }, 'organizacao.criada', 'organization', orgId, { name: input.gym.name, branches: input.gym.branches });
    });
    return this.issue(userId, orgId, device);
  }

  /** RF-AUT-01 · entrar com telemóvel e senha. */
  async login(phone: string, password: string, orgId?: string, device?: string): Promise<Session> {
    const user = await this.database.system(async (tx) => (await tx.select().from(users).where(eq(users.phone, phone)))[0]);
    // Mesma mensagem para número inexistente e senha errada (não revela quem tem conta).
    if (!user || !(await verifyPassword(password, user.passwordHash))) throw new DomainError('CREDENCIAIS_INVALIDAS', 'Número ou senha incorrectos.', 401);
    return this.issue(user.id, orgId, device);
  }

  /** Renovação com rotação; reutilizar um token já usado revoga a família toda (RNF-04). */
  async refresh(token: string, device?: string): Promise<Session> {
    const now = this.clock.now();
    const row = await this.database.system(async (tx) => {
      const [r] = await tx.select().from(refreshTokens).where(eq(refreshTokens.tokenHash, hashToken(token)));
      if (!r) return null;
      if (r.revokedAt) {
        await tx.update(refreshTokens).set({ revokedAt: now }).where(and(eq(refreshTokens.familyId, r.familyId), isNull(refreshTokens.revokedAt)));
        return 'reused' as const;
      }
      await tx.update(refreshTokens).set({ revokedAt: now }).where(eq(refreshTokens.id, r.id));
      return r;
    });
    if (!row || row === 'reused' || row.expiresAt <= now) throw new DomainError('SESSAO_INVALIDA', 'Sessão inválida ou expirada. Entre de novo.', 401);
    return this.issue(row.userId, row.orgId, device ?? row.device ?? undefined, row.familyId);
  }

  async logout(token: string) {
    await this.database.system(async (tx) => {
      const [r] = await tx.select().from(refreshTokens).where(eq(refreshTokens.tokenHash, hashToken(token)));
      if (r) await tx.update(refreshTokens).set({ revokedAt: this.clock.now() }).where(and(eq(refreshTokens.familyId, r.familyId), isNull(refreshTokens.revokedAt)));
    });
  }

  /** RF-EQP-01 · convida um funcionário. Se o número ainda não tem conta, cria-a com senha temporária enviada por SMS. */
  async inviteStaff(ctx: AuthCtx, input: { name: string; phone: string; role: StaffRole; branchIds: string[] | null }) {
    if (input.role === 'dono') throw new DomainError('PERFIL_INVALIDO', 'Só pode haver um dono por organização.');
    const { userId, tempPassword } = await this.ensureUser(input.name, input.phone);
    return this.database.withOrg(ctx, async (tx) => {
      const [dup] = await tx.select({ id: staff.id }).from(staff).where(and(eq(staff.orgId, ctx.orgId), eq(staff.userId, userId), eq(staff.role, input.role)));
      if (dup) throw conflict('JA_NA_EQUIPA', 'Esta pessoa já tem este perfil na equipa.');
      const id = uuidv7();
      await tx.insert(staff).values({ id, orgId: ctx.orgId, userId, role: input.role, branchIds: input.branchIds });
      if (tempPassword) await this.outbox.enqueue(tx, ctx.orgId, 'sms', input.phone, 'equipa.convite', { nome: input.name, senha: tempPassword });
      await this.audit.record(tx, ctx, 'equipa.convidado', 'staff', id, { userId, role: input.role, branchIds: input.branchIds });
      // A senha temporária só volta na resposta fora de produção (para testes e demonstração).
      return { id, userId, role: input.role, ...(this.env.NODE_ENV !== 'production' && tempPassword ? { tempPassword } : {}) };
    });
  }

  /**
   * Garante uma conta de utilizador para este telemóvel (conta da app do membro, RF-AUT-06).
   * Corre na sua própria transacção de sistema: chamar ANTES da transacção da organização
   * (o PGlite tem uma só ligação e não aceita transacções encaixadas).
   */
  async ensureUser(name: string, phone: string): Promise<{ userId: string; tempPassword: string | null }> {
    return this.database.system(async (tx) => {
      const [u] = await tx.select({ id: users.id }).from(users).where(eq(users.phone, phone));
      if (u) return { userId: u.id, tempPassword: null };
      const userId = uuidv7();
      const tempPassword = String(Math.floor(100000 + Math.random() * 900000));
      await tx.insert(users).values({ id: userId, phone, name, passwordHash: await hashPassword(tempPassword), mustChangePassword: true });
      return { userId, tempPassword };
    });
  }

  async changePassword(userId: string, current: string, next: string) {
    await this.database.system(async (tx) => {
      const [u] = await tx.select().from(users).where(eq(users.id, userId));
      if (!u || !(await verifyPassword(current, u.passwordHash))) throw new DomainError('CREDENCIAIS_INVALIDAS', 'A senha actual está incorrecta.', 401);
      await tx.update(users).set({ passwordHash: await hashPassword(next), mustChangePassword: false }).where(eq(users.id, userId));
    });
  }

  /** Confirma a senha antes de uma acção sensível (RNF-05). */
  async confirmPassword(userId: string, password: string) {
    const u = await this.database.system(async (tx) => (await tx.select().from(users).where(eq(users.id, userId)))[0]);
    if (!u || !(await verifyPassword(password, u.passwordHash))) throw new DomainError('CONFIRMACAO_FALHOU', 'Senha incorrecta. A acção não foi feita.', 401);
  }

  /** Perfis do utilizador em cada organização (staff + membro). */
  private async memberships(userId: string) {
    return this.database.withUser(userId, async (tx) => {
      const st = await tx.select().from(staff).where(and(eq(staff.userId, userId), eq(staff.active, true)));
      const mb = await tx.select({ id: members.id, orgId: members.orgId }).from(members).where(eq(members.userId, userId));
      return { st, mb };
    });
  }

  private async issue(userId: string, wantedOrg?: string, device?: string, familyId = uuidv7()): Promise<Session> {
    const { st, mb } = await this.memberships(userId);
    const orgIds = [...new Set([...st.map((s) => s.orgId), ...mb.map((m) => m.orgId)])];
    if (!orgIds.length) throw new DomainError('SEM_ORGANIZACAO', 'Esta conta não está ligada a nenhum ginásio.', 403);
    const orgId = wantedOrg && orgIds.includes(wantedOrg) ? wantedOrg : orgIds[0]!;
    const rolesOf = (o: string): Role[] => [...st.filter((s) => s.orgId === o).map((s) => s.role as Role), ...(mb.some((m) => m.orgId === o) ? (['membro'] as Role[]) : [])];
    const mine = st.filter((s) => s.orgId === orgId);
    const roles = rolesOf(orgId);
    const branchIds = mine.length === 0 || mine.some((s) => s.role === 'dono' || s.branchIds === null) ? null : [...new Set(mine.flatMap((s) => s.branchIds ?? []))];
    const memberId = mb.find((m) => m.orgId === orgId)?.id ?? null;

    const user = await this.database.system(async (tx) => (await tx.select().from(users).where(eq(users.id, userId)))[0]!);
    const orgNames = await Promise.all(
      orgIds.map(async (o) => ({ id: o, name: await this.database.withOrg({ orgId: o, userId }, async (tx) => (await tx.select({ name: organizations.name }).from(organizations))[0]?.name ?? '') })),
    );

    const refreshToken = newRefreshToken();
    const now = this.clock.now();
    await this.database.system(async (tx) => {
      await tx.insert(refreshTokens).values({ id: uuidv7(), userId, orgId, familyId, tokenHash: hashToken(refreshToken), device: device ?? null, expiresAt: new Date(now.getTime() + this.env.REFRESH_TOKEN_DAYS * 86_400_000) });
    });
    const accessToken = signAccess({ sub: userId, org: orgId, roles, br: branchIds, mem: memberId }, this.env.JWT_SECRET, this.env.ACCESS_TOKEN_MINUTES, now.getTime());
    return {
      accessToken,
      refreshToken,
      expiresIn: this.env.ACCESS_TOKEN_MINUTES * 60,
      user: { id: user.id, name: user.name, phone: user.phone, mustChangePassword: user.mustChangePassword },
      org: { id: orgId, name: orgNames.find((o) => o.id === orgId)?.name ?? '' },
      roles,
      branchIds,
      memberId,
      organizacoes: orgNames.map((o) => ({ ...o, roles: rolesOf(o.id) })),
    };
  }
}
