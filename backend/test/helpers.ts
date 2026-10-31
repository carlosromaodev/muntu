import { randomUUID } from 'node:crypto';
import { createApp } from '../src/app.js';
import { Clock } from '../src/common/clock.js';
import { loadEnv } from '../src/config/env.js';

export type Res = { status: number; body: any };

/** Aplicação real com PostgreSQL embutido em memória e relógio fixo (quinta, 30 Out 2026, 09:00 em Luanda). */
export async function setup() {
  const env = loadEnv({ NODE_ENV: 'test', DATABASE_URL: 'memory://', ACCESS_TOKEN_MINUTES: String(60 * 24 * 365) });
  const clock = new Clock(new Date('2026-10-30T09:00:00+01:00'));
  const { app, database } = await createApp(env, { clock, logger: false });
  const call = async (method: 'GET' | 'POST' | 'PATCH' | 'PUT', url: string, body?: unknown, token?: string): Promise<Res> => {
    const r = await app.inject({ method, url: `/v1${url}`, payload: body as any, headers: token ? { authorization: `Bearer ${token}` } : {} });
    return { status: r.statusCode, body: r.body ? JSON.parse(r.body) : null };
  };
  return { app, database, clock, env, call, close: async () => { await app.close(); await database.close(); } };
}

export type T = Awaited<ReturnType<typeof setup>>;

let phoneSeq = 0;
/** Telemóvel angolano único para cada teste. */
export const phone = () => `92${String(1000000 + ++phoneSeq).slice(-7)}`;
export const key = () => randomUUID();

/** Ginásio com dono, recepção, finanças e gerente, um plano mensal e o caixa aberto. */
export async function gym(t: T, name = 'Mwangolé Fit') {
  const donoPhone = phone();
  const reg = await t.call('POST', '/auth/registar-ginasio', { dono: { nome: 'Paulo Neto', telefone: donoPhone, senha: 'segredo1' }, ginasio: { nome: name, nif: '5417229011', cidade: 'Luanda', filiais: ['Talatona', 'Kilamba'] } });
  if (reg.status !== 201) throw new Error(`registo falhou: ${JSON.stringify(reg.body)}`);
  const dono = reg.body.accessToken as string;
  const fil = await t.call('GET', '/filiais', undefined, dono);
  const talatona = fil.body.find((b: any) => b.name === 'Talatona').id as string;
  const kilamba = fil.body.find((b: any) => b.name === 'Kilamba').id as string;

  const staff = async (perfil: string, nome: string) => {
    const tel = phone();
    const inv = await t.call('POST', '/equipa', { nome, telefone: tel, perfil, filiais: perfil === 'financas' ? null : [talatona] }, dono);
    if (inv.status !== 201) throw new Error(`convite falhou: ${JSON.stringify(inv.body)}`);
    const login = await t.call('POST', '/auth/entrar', { telefone: tel, senha: inv.body.tempPassword });
    return { token: login.body.accessToken as string, password: inv.body.tempPassword as string, userId: inv.body.userId as string, phone: tel };
  };
  const rececao = await staff('rececao', 'Celma Bento');
  const rececao2 = await staff('rececao', 'Teresa Lunda');
  const financas = await staff('financas', 'Jorge Afonso');
  const gerente = await staff('gerente', 'Rui Manuel');

  const plan = await t.call('POST', '/planos', { nome: 'Local Mensal', precoCentimos: 3_000_000, dias: 30, ambito: 'local', filialId: talatona, descontoMaximo: 20 }, dono);
  const rede = await t.call('POST', '/planos', { nome: 'Rede Mensal', precoCentimos: 4_500_000, dias: 30, ambito: 'rede' }, dono);
  const teste = await t.call('POST', '/planos', { nome: 'Teste grátis', precoCentimos: 0, dias: 7, ambito: 'rede', teste: true }, dono);
  const shift = await t.call('POST', '/caixa/turnos', { filialId: talatona, turno: 'manha', fundoCentimos: 2_000_000 }, rececao.token);
  if (shift.status !== 201) throw new Error(`abrir caixa falhou: ${JSON.stringify(shift.body)}`);
  return { orgId: reg.body.org.id as string, dono, donoPassword: 'segredo1', donoPhone, talatona, kilamba, rececao, rececao2, financas, gerente, planId: plan.body.id as string, redeId: rede.body.id as string, testeId: teste.body.id as string, shiftId: shift.body.id as string };
}

export type Gym = Awaited<ReturnType<typeof gym>>;

/** Inscreve um membro e devolve a subscrição pendente. */
export async function enroll(t: T, g: Gym, planId = g.planId, extra: Record<string, unknown> = {}) {
  const m = await t.call('POST', '/membros', { nome: 'Kátia Muondo', telefone: phone(), bi: `00${Math.floor(Math.random() * 1e9)}LA041`, filialId: g.talatona, consentimento: true, ...extra }, g.rececao.token);
  if (m.status !== 201) throw new Error(`inscrição falhou: ${JSON.stringify(m.body)}`);
  const s = await t.call('POST', `/membros/${m.body.id}/subscricoes`, { planoId: planId }, g.rececao.token);
  if (s.status !== 201) throw new Error(`subscrição falhou: ${JSON.stringify(s.body)}`);
  return { member: m.body, sub: s.body };
}

/** Inscreve e paga em dinheiro. */
export async function enrollPaid(t: T, g: Gym) {
  const e = await enroll(t, g);
  const p = await t.call('POST', '/pagamentos', { filialId: g.talatona, membroId: e.member.id, subscricaoId: e.sub.id, meio: 'dinheiro', valorCentimos: e.sub.priceCents, chaveIdempotencia: key() }, g.rececao.token);
  if (p.status !== 201) throw new Error(`pagamento falhou: ${JSON.stringify(p.body)}`);
  return { ...e, payment: p.body };
}
