/**
 * Migração 0001 · esquema inicial do MVP.
 *
 * Decisões que vivem na própria base de dados (e não só na aplicação):
 *  - Isolamento entre ginásios por Row-Level Security (RNF-01). As consultas da
 *    aplicação correm com o papel `muntu_app` e com `app.org_id` definido na
 *    transacção; sem isso não vêem nenhuma linha.
 *  - Livro razão, contagens, entradas, facturas e auditoria só aceitam INSERT
 *    (RNF-20): um trigger recusa UPDATE, DELETE e TRUNCATE.
 *  - Dinheiro em cêntimos inteiros (bigint) (RNF-21).
 */
export default /* sql */ `
DO $$ BEGIN
  CREATE ROLE muntu_app NOLOGIN;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

GRANT USAGE ON SCHEMA public TO muntu_app;

CREATE OR REPLACE FUNCTION muntu_org() RETURNS uuid
LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('app.org_id', true), '')::uuid $$;

CREATE OR REPLACE FUNCTION muntu_user() RETURNS uuid
LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('app.user_id', true), '')::uuid $$;

CREATE OR REPLACE FUNCTION muntu_somente_acrescentar() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'Registo imutável: % não permite %', TG_TABLE_NAME, TG_OP USING ERRCODE = 'P0001';
END $$;

-- ---------------------------------------------------------------- identidade
CREATE TABLE users (
  id uuid PRIMARY KEY,
  phone text NOT NULL UNIQUE,
  name text NOT NULL,
  password_hash text NOT NULL,
  must_change_password boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT (id, phone, name, must_change_password, created_at) ON users TO muntu_app;

CREATE TABLE refresh_tokens (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  org_id uuid NOT NULL,
  family_id uuid NOT NULL,
  token_hash text NOT NULL UNIQUE,
  device text,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX refresh_tokens_family ON refresh_tokens(family_id);

-- --------------------------------------------------------------- organização
CREATE TABLE organizations (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  nif text,
  city text,
  tax_regime text NOT NULL DEFAULT 'geral' CHECK (tax_regime IN ('geral','simplificado','isento')),
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE branches (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  code text NOT NULL,
  capacity integer NOT NULL DEFAULT 120,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, code)
);

CREATE TABLE staff (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL REFERENCES users(id),
  role text NOT NULL CHECK (role IN ('dono','gerente','rececao','financas','pt','vigilante')),
  branch_ids uuid[],
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, user_id, role)
);

CREATE TABLE counters (
  org_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  PRIMARY KEY (org_id, name)
);

-- ----------------------------------------------------- planos e membros
CREATE TABLE plans (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  price_cents bigint NOT NULL CHECK (price_cents >= 0),
  period_days integer NOT NULL CHECK (period_days > 0),
  scope text NOT NULL CHECK (scope IN ('local','rede','hibrido','horario')),
  branch_id uuid REFERENCES branches(id),
  other_entries_month integer NOT NULL DEFAULT 0,
  hours_from smallint,
  hours_to smallint,
  max_discount_pct smallint NOT NULL DEFAULT 10 CHECK (max_discount_pct BETWEEN 0 AND 100),
  is_trial boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE members (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  number integer NOT NULL,
  user_id uuid REFERENCES users(id),
  name text NOT NULL,
  phone text NOT NULL,
  bi text,
  nif text,
  birth_date date,
  base_branch_id uuid NOT NULL REFERENCES branches(id),
  consent_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, number),
  UNIQUE (org_id, phone)
);
CREATE UNIQUE INDEX members_bi ON members(org_id, bi) WHERE bi IS NOT NULL;
CREATE INDEX members_name ON members(org_id, lower(name));

CREATE TABLE trials (
  org_id uuid NOT NULL REFERENCES organizations(id),
  key text NOT NULL,
  member_id uuid NOT NULL REFERENCES members(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (org_id, key)
);

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  member_id uuid NOT NULL REFERENCES members(id),
  plan_id uuid NOT NULL REFERENCES plans(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  status text NOT NULL CHECK (status IN ('pendente','activa','congelada','cancelada')),
  price_cents bigint NOT NULL,
  discount_pct smallint NOT NULL DEFAULT 0,
  starts_on date,
  ends_on date,
  activated_by text CHECK (activated_by IN ('pagamento','aprovacao','teste')),
  activation_ref uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX subscriptions_member ON subscriptions(org_id, member_id);

-- ----------------------------------------------------- turnos e caixa
CREATE TABLE shifts (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  kind text NOT NULL CHECK (kind IN ('manha','tarde','dia')),
  status text NOT NULL CHECK (status IN ('aberto','fechado')),
  opened_by uuid NOT NULL,
  opened_at timestamptz NOT NULL DEFAULT now(),
  opening_float_cents bigint NOT NULL DEFAULT 0,
  previous_shift_id uuid REFERENCES shifts(id),
  closed_by uuid,
  closed_at timestamptz
);
CREATE UNIQUE INDEX shifts_um_aberto ON shifts(branch_id) WHERE status = 'aberto';

CREATE TABLE payments (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  member_id uuid REFERENCES members(id),
  subscription_id uuid REFERENCES subscriptions(id),
  shift_id uuid REFERENCES shifts(id),
  method text NOT NULL CHECK (method IN ('dinheiro','tpa','express','referencia','transferencia')),
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  status text NOT NULL CHECK (status IN ('pendente','confirmado','falhado','expirado')),
  external_ref text,
  idempotency_key text NOT NULL,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  UNIQUE (org_id, idempotency_key)
);

-- Livro razão: todo o dinheiro que entra ou sai, com origem (RN-12). Só INSERT.
CREATE TABLE cash_movements (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  shift_id uuid REFERENCES shifts(id),
  kind text NOT NULL CHECK (kind IN ('abertura','pagamento','sangria','reforco','despesa','estorno')),
  method text NOT NULL CHECK (method IN ('dinheiro','tpa','express','referencia','transferencia')),
  amount_cents bigint NOT NULL,
  origin_type text,
  origin_id uuid,
  reverses_id uuid REFERENCES cash_movements(id),
  reason text,
  receipt_url text,
  created_by uuid NOT NULL,
  approved_by uuid,
  device_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX cash_movements_shift ON cash_movements(shift_id);
CREATE UNIQUE INDEX cash_movements_um_estorno ON cash_movements(reverses_id) WHERE reverses_id IS NOT NULL;

-- Contagens às cegas (fecho e recepção de turno). Só INSERT (RN-13, RN-52).
CREATE TABLE shift_counts (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  shift_id uuid NOT NULL REFERENCES shifts(id),
  purpose text NOT NULL CHECK (purpose IN ('fecho','recepcao')),
  counted_by uuid NOT NULL,
  quantities jsonb NOT NULL,
  loose_cents bigint NOT NULL DEFAULT 0,
  counted_cents bigint NOT NULL,
  expected_cents bigint NOT NULL,
  difference_cents bigint NOT NULL,
  decision text CHECK (decision IN ('sem_diferenca','ressalva','revisao')),
  justification text,
  without_colleague boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------- facturação
CREATE TABLE invoice_series (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  doc_type text NOT NULL CHECK (doc_type IN ('FR','FT','NC')),
  year integer NOT NULL,
  code text NOT NULL,
  next_number integer NOT NULL DEFAULT 1,
  last_hash text NOT NULL DEFAULT '',
  UNIQUE (org_id, branch_id, doc_type, year)
);

CREATE TABLE invoices (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  series_id uuid NOT NULL REFERENCES invoice_series(id),
  doc_type text NOT NULL CHECK (doc_type IN ('FR','FT','NC')),
  number integer NOT NULL,
  full_number text NOT NULL,
  member_id uuid REFERENCES members(id),
  payment_id uuid REFERENCES payments(id),
  references_id uuid REFERENCES invoices(id),
  description text NOT NULL,
  total_cents bigint NOT NULL,
  tax_cents bigint NOT NULL DEFAULT 0,
  reason text,
  hash text NOT NULL,
  prev_hash text NOT NULL,
  issued_by uuid NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (series_id, number)
);

-- Comunicação à AGT (estado por documento, só INSERT; o último evento manda).
CREATE TABLE invoice_agt_events (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  invoice_id uuid NOT NULL REFERENCES invoices(id),
  status text NOT NULL CHECK (status IN ('por_comunicar','comunicada','erro')),
  agt_code text,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------- aprovações
CREATE TABLE approval_requests (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid REFERENCES branches(id),
  kind text NOT NULL CHECK (kind IN ('estorno','desconto','activar_sem_pagamento','despesa','preco','reabrir_caixa','data_passada','entrada_manual')),
  payload jsonb NOT NULL,
  amount_cents bigint,
  reason text NOT NULL,
  required_role text NOT NULL CHECK (required_role IN ('gerente','financas','dono')),
  status text NOT NULL CHECK (status IN ('pendente','aprovado','recusado','expirado')),
  requested_by uuid NOT NULL,
  decided_by uuid,
  decided_at timestamptz,
  decision_reason text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX approval_requests_pending ON approval_requests(org_id, status);

-- ----------------------------------------------------- acessos
CREATE TABLE checkins (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  member_id uuid NOT NULL REFERENCES members(id),
  result text NOT NULL CHECK (result IN ('entrou','recusado','manual')),
  reason text,
  method text NOT NULL CHECK (method IN ('qr','manual','catraca')),
  created_by uuid,
  device_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX checkins_member_time ON checkins(member_id, created_at DESC);
CREATE INDEX checkins_branch_time ON checkins(branch_id, created_at DESC);

-- ----------------------------------------------------- ocorrências
CREATE TABLE incidents (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  number integer NOT NULL,
  code text NOT NULL,
  reporter_kind text NOT NULL CHECK (reporter_kind IN ('membro','equipa')),
  reporter_user_id uuid NOT NULL,
  anonymous boolean NOT NULL DEFAULT false,
  type text NOT NULL,
  zone text NOT NULL,
  equipment text,
  description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 400),
  photo_url text,
  hurt boolean NOT NULL DEFAULT false,
  urgency text NOT NULL CHECK (urgency IN ('baixa','media','alta')),
  route_to text CHECK (route_to IN ('manutencao','gestao','rececao')),
  status text NOT NULL CHECK (status IN ('recebida','em_analise','resolvida')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, number)
);

CREATE TABLE incident_events (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  incident_id uuid NOT NULL REFERENCES incidents(id),
  status text NOT NULL,
  note text,
  by_user uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------- saída (SMS, push)
CREATE TABLE outbox (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  channel text NOT NULL CHECK (channel IN ('sms','push','whatsapp')),
  target text NOT NULL,
  template text NOT NULL,
  payload jsonb NOT NULL,
  dedupe_key text,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','enviado','falhou')),
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);
CREATE UNIQUE INDEX outbox_dedupe ON outbox(org_id, dedupe_key) WHERE dedupe_key IS NOT NULL;

-- ----------------------------------------------------- auditoria (RF-AUD-01)
CREATE TABLE audit_log (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  actor_user_id uuid,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id uuid,
  before jsonb,
  after jsonb,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_log_entity ON audit_log(org_id, entity, entity_id);

-- ----------------------------------------------------- imutabilidade (RNF-20)
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['cash_movements','shift_counts','invoices','invoice_agt_events','checkins','incident_events','audit_log'] LOOP
    EXECUTE format('CREATE TRIGGER %I_imutavel BEFORE UPDATE OR DELETE ON %I FOR EACH ROW EXECUTE FUNCTION muntu_somente_acrescentar()', t, t);
    EXECUTE format('CREATE TRIGGER %I_sem_truncate BEFORE TRUNCATE ON %I FOR EACH STATEMENT EXECUTE FUNCTION muntu_somente_acrescentar()', t, t);
  END LOOP;
END $$;

-- ----------------------------------------------------- isolamento (RNF-01)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations FORCE ROW LEVEL SECURITY;
CREATE POLICY organizations_isolamento ON organizations USING (id = muntu_org()) WITH CHECK (id = muntu_org());

-- staff e members: além da própria organização, um utilizador vê as suas
-- próprias ligações (para escolher o ginásio ao entrar).
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff FORCE ROW LEVEL SECURITY;
CREATE POLICY staff_isolamento ON staff USING (org_id = muntu_org() OR user_id = muntu_user()) WITH CHECK (org_id = muntu_org());

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE members FORCE ROW LEVEL SECURITY;
CREATE POLICY members_isolamento ON members USING (org_id = muntu_org() OR (user_id IS NOT NULL AND user_id = muntu_user())) WITH CHECK (org_id = muntu_org());

-- users e refresh_tokens são tabelas do sistema de autenticação: só o serviço
-- de autenticação lhes acede, fora do papel muntu_app (sem RLS).

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['branches','counters','plans','trials','subscriptions','shifts','payments','cash_movements','shift_counts','invoice_series','invoices','invoice_agt_events','approval_requests','checkins','incidents','incident_events','outbox','audit_log'] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I_isolamento ON %I USING (org_id = muntu_org()) WITH CHECK (org_id = muntu_org())', t, t);
  END LOOP;
END $$;

-- ----------------------------------------------------- permissões do papel da aplicação
GRANT SELECT, INSERT, UPDATE ON organizations, branches, staff, counters, plans, members, trials, subscriptions, shifts, payments, invoice_series, approval_requests, incidents, outbox TO muntu_app;
GRANT SELECT, INSERT ON cash_movements, shift_counts, invoices, invoice_agt_events, checkins, incident_events, audit_log TO muntu_app;
`;
