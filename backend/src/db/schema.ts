import { bigint, boolean, date, integer, jsonb, pgTable, smallint, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/*
 * Espelho tipado das tabelas criadas nas migrações (src/db/migrations).
 * A migração SQL é a fonte de verdade (RLS, triggers, índices parciais);
 * este ficheiro dá tipos às consultas do Drizzle.
 */

const money = (name: string) => bigint(name, { mode: 'number' });
const ts = (name: string) => timestamp(name, { withTimezone: true, mode: 'date' });
const day = (name: string) => date(name, { mode: 'string' });

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  phone: text('phone').notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  mustChangePassword: boolean('must_change_password').notNull().default(false),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  orgId: uuid('org_id').notNull(),
  familyId: uuid('family_id').notNull(),
  tokenHash: text('token_hash').notNull(),
  device: text('device'),
  expiresAt: ts('expires_at').notNull(),
  revokedAt: ts('revoked_at'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type OrgSettings = {
  toleranceDays?: number;
  warnDays?: number;
  trialDays?: number;
  freezeMaxDaysYear?: number;
  discountLimits?: { rececao: number; gerente: number };
  refundLimitFinancasCents?: number;
  expenseLimitFinancasCents?: number;
  expenseReceiptAboveCents?: number;
  antiPassbackMinutes?: number;
  avgStayMinutes?: number;
  approvalTtlHours?: number;
  priceNoticeDays?: number;
};

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  nif: text('nif'),
  city: text('city'),
  taxRegime: text('tax_regime').notNull().default('geral'),
  settings: jsonb('settings').$type<OrgSettings>().notNull().default({}),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const branches = pgTable('branches', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  capacity: integer('capacity').notNull().default(120),
  active: boolean('active').notNull().default(true),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type StaffRole = 'dono' | 'gerente' | 'rececao' | 'financas' | 'pt' | 'vigilante';

export const staff = pgTable('staff', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  userId: uuid('user_id').notNull(),
  role: text('role').$type<StaffRole>().notNull(),
  branchIds: uuid('branch_ids').array(),
  active: boolean('active').notNull().default(true),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const counters = pgTable('counters', {
  orgId: uuid('org_id').notNull(),
  name: text('name').notNull(),
  value: integer('value').notNull().default(0),
});

export type PlanScope = 'local' | 'rede' | 'hibrido' | 'horario';

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  name: text('name').notNull(),
  priceCents: money('price_cents').notNull(),
  periodDays: integer('period_days').notNull(),
  scope: text('scope').$type<PlanScope>().notNull(),
  branchId: uuid('branch_id'),
  otherEntriesMonth: integer('other_entries_month').notNull().default(0),
  hoursFrom: smallint('hours_from'),
  hoursTo: smallint('hours_to'),
  maxDiscountPct: smallint('max_discount_pct').notNull().default(10),
  isTrial: boolean('is_trial').notNull().default(false),
  active: boolean('active').notNull().default(true),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const members = pgTable('members', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  number: integer('number').notNull(),
  userId: uuid('user_id'),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  bi: text('bi'),
  nif: text('nif'),
  birthDate: day('birth_date'),
  baseBranchId: uuid('base_branch_id').notNull(),
  consentAt: ts('consent_at'),
  createdBy: uuid('created_by'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const trials = pgTable('trials', {
  orgId: uuid('org_id').notNull(),
  key: text('key').notNull(),
  memberId: uuid('member_id').notNull(),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type SubscriptionStatus = 'pendente' | 'activa' | 'congelada' | 'cancelada';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  memberId: uuid('member_id').notNull(),
  planId: uuid('plan_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  status: text('status').$type<SubscriptionStatus>().notNull(),
  priceCents: money('price_cents').notNull(),
  discountPct: smallint('discount_pct').notNull().default(0),
  startsOn: day('starts_on'),
  endsOn: day('ends_on'),
  activatedBy: text('activated_by').$type<'pagamento' | 'aprovacao' | 'teste'>(),
  activationRef: uuid('activation_ref'),
  createdBy: uuid('created_by'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type ShiftKind = 'manha' | 'tarde' | 'dia';

export const shifts = pgTable('shifts', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  kind: text('kind').$type<ShiftKind>().notNull(),
  status: text('status').$type<'aberto' | 'fechado'>().notNull(),
  openedBy: uuid('opened_by').notNull(),
  openedAt: ts('opened_at').notNull().defaultNow(),
  openingFloatCents: money('opening_float_cents').notNull().default(0),
  previousShiftId: uuid('previous_shift_id'),
  closedBy: uuid('closed_by'),
  closedAt: ts('closed_at'),
});

export type PayMethod = 'dinheiro' | 'tpa' | 'express' | 'referencia' | 'transferencia';
export type PaymentStatus = 'pendente' | 'confirmado' | 'falhado' | 'expirado';

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  memberId: uuid('member_id'),
  subscriptionId: uuid('subscription_id'),
  shiftId: uuid('shift_id'),
  method: text('method').$type<PayMethod>().notNull(),
  amountCents: money('amount_cents').notNull(),
  status: text('status').$type<PaymentStatus>().notNull(),
  externalRef: text('external_ref'),
  idempotencyKey: text('idempotency_key').notNull(),
  createdBy: uuid('created_by'),
  createdAt: ts('created_at').notNull().defaultNow(),
  confirmedAt: ts('confirmed_at'),
});

export type MovementKind = 'abertura' | 'pagamento' | 'sangria' | 'reforco' | 'despesa' | 'estorno';

export const cashMovements = pgTable('cash_movements', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  shiftId: uuid('shift_id'),
  kind: text('kind').$type<MovementKind>().notNull(),
  method: text('method').$type<PayMethod>().notNull(),
  amountCents: money('amount_cents').notNull(),
  originType: text('origin_type'),
  originId: uuid('origin_id'),
  reversesId: uuid('reverses_id'),
  reason: text('reason'),
  receiptUrl: text('receipt_url'),
  createdBy: uuid('created_by').notNull(),
  approvedBy: uuid('approved_by'),
  deviceAt: ts('device_at'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const shiftCounts = pgTable('shift_counts', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  shiftId: uuid('shift_id').notNull(),
  purpose: text('purpose').$type<'fecho' | 'recepcao'>().notNull(),
  countedBy: uuid('counted_by').notNull(),
  quantities: jsonb('quantities').$type<Record<string, number>>().notNull(),
  looseCents: money('loose_cents').notNull().default(0),
  countedCents: money('counted_cents').notNull(),
  expectedCents: money('expected_cents').notNull(),
  differenceCents: money('difference_cents').notNull(),
  decision: text('decision').$type<'sem_diferenca' | 'ressalva' | 'revisao'>(),
  justification: text('justification'),
  withoutColleague: boolean('without_colleague').notNull().default(false),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type DocType = 'FR' | 'FT' | 'NC';

export const invoiceSeries = pgTable('invoice_series', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  docType: text('doc_type').$type<DocType>().notNull(),
  year: integer('year').notNull(),
  code: text('code').notNull(),
  nextNumber: integer('next_number').notNull().default(1),
  lastHash: text('last_hash').notNull().default(''),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  seriesId: uuid('series_id').notNull(),
  docType: text('doc_type').$type<DocType>().notNull(),
  number: integer('number').notNull(),
  fullNumber: text('full_number').notNull(),
  memberId: uuid('member_id'),
  paymentId: uuid('payment_id'),
  referencesId: uuid('references_id'),
  description: text('description').notNull(),
  totalCents: money('total_cents').notNull(),
  taxCents: money('tax_cents').notNull().default(0),
  reason: text('reason'),
  hash: text('hash').notNull(),
  prevHash: text('prev_hash').notNull(),
  issuedBy: uuid('issued_by').notNull(),
  issuedAt: ts('issued_at').notNull().defaultNow(),
});

export const invoiceAgtEvents = pgTable('invoice_agt_events', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  invoiceId: uuid('invoice_id').notNull(),
  status: text('status').$type<'por_comunicar' | 'comunicada' | 'erro'>().notNull(),
  agtCode: text('agt_code'),
  detail: text('detail'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export type ApprovalKind = 'estorno' | 'desconto' | 'activar_sem_pagamento' | 'despesa' | 'preco' | 'reabrir_caixa' | 'data_passada' | 'entrada_manual';
export type ApproverRole = 'gerente' | 'financas' | 'dono';

export const approvalRequests = pgTable('approval_requests', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id'),
  kind: text('kind').$type<ApprovalKind>().notNull(),
  payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
  amountCents: money('amount_cents'),
  reason: text('reason').notNull(),
  requiredRole: text('required_role').$type<ApproverRole>().notNull(),
  status: text('status').$type<'pendente' | 'aprovado' | 'recusado' | 'expirado'>().notNull(),
  requestedBy: uuid('requested_by').notNull(),
  decidedBy: uuid('decided_by'),
  decidedAt: ts('decided_at'),
  decisionReason: text('decision_reason'),
  expiresAt: ts('expires_at').notNull(),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const checkins = pgTable('checkins', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  memberId: uuid('member_id').notNull(),
  result: text('result').$type<'entrou' | 'recusado' | 'manual'>().notNull(),
  reason: text('reason'),
  method: text('method').$type<'qr' | 'manual' | 'catraca'>().notNull(),
  createdBy: uuid('created_by'),
  deviceAt: ts('device_at'),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const incidents = pgTable('incidents', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  number: integer('number').notNull(),
  code: text('code').notNull(),
  reporterKind: text('reporter_kind').$type<'membro' | 'equipa'>().notNull(),
  reporterUserId: uuid('reporter_user_id').notNull(),
  anonymous: boolean('anonymous').notNull().default(false),
  type: text('type').notNull(),
  zone: text('zone').notNull(),
  equipment: text('equipment'),
  description: text('description').notNull(),
  photoUrl: text('photo_url'),
  hurt: boolean('hurt').notNull().default(false),
  urgency: text('urgency').$type<'baixa' | 'media' | 'alta'>().notNull(),
  routeTo: text('route_to').$type<'manutencao' | 'gestao' | 'rececao'>(),
  status: text('status').$type<'recebida' | 'em_analise' | 'resolvida'>().notNull(),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const incidentEvents = pgTable('incident_events', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  incidentId: uuid('incident_id').notNull(),
  status: text('status').notNull(),
  note: text('note'),
  byUser: uuid('by_user').notNull(),
  createdAt: ts('created_at').notNull().defaultNow(),
});

export const outbox = pgTable('outbox', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  channel: text('channel').$type<'sms' | 'push' | 'whatsapp'>().notNull(),
  target: text('target').notNull(),
  template: text('template').notNull(),
  payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
  dedupeKey: text('dedupe_key'),
  status: text('status').$type<'pendente' | 'enviado' | 'falhou'>().notNull().default('pendente'),
  attempts: integer('attempts').notNull().default(0),
  createdAt: ts('created_at').notNull().defaultNow(),
  sentAt: ts('sent_at'),
});

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  actorUserId: uuid('actor_user_id'),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: uuid('entity_id'),
  before: jsonb('before'),
  after: jsonb('after'),
  ip: text('ip'),
  createdAt: ts('created_at').notNull().defaultNow(),
});
