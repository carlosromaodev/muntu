import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import type { StaffRole } from '../db/schema.js';

export type Role = StaffRole | 'membro';

/** Quem faz o pedido (vem do token de acesso). */
export type AuthCtx = {
  userId: string;
  orgId: string;
  roles: Role[];
  /** Filiais que pode ver; null = todas. */
  branchIds: string[] | null;
  /** Se entrou como membro, o id do membro nessa organização. */
  memberId: string | null;
};

declare module 'fastify' {
  interface FastifyRequest {
    ctx?: AuthCtx;
  }
}

export const PUBLIC = 'muntu:public';
export const ROLES = 'muntu:roles';

/** Endpoint sem sessão (entrar, criar conta, webhooks). */
export const Public = () => SetMetadata(PUBLIC, true);
/** Só estes perfis (o dono passa sempre). */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);

export const Ctx = createParamDecorator((_: unknown, host: ExecutionContext): AuthCtx => host.switchToHttp().getRequest().ctx);

/** Pode actuar nesta filial? */
export const canSeeBranch = (ctx: AuthCtx, branchId: string) => ctx.roles.includes('dono') || ctx.branchIds === null || ctx.branchIds.includes(branchId);

export const hasRole = (ctx: AuthCtx, ...roles: Role[]) => ctx.roles.includes('dono') || roles.some((r) => ctx.roles.includes(r));
