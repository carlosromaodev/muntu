/**
 * Migração 0002 · operação diária e comunicação.
 *
 *  - Pendências que passam de turno em turno (RF-PEN-01/02), com eventos só de acrescentar.
 *  - Avisos à equipa com confirmação de leitura (RF-AVI-01).
 *  - Regras de mensagens automáticas e registo de envios (RF-AVI-02/03).
 *  - Notificações na app (destino das mensagens "push" à equipa e aos membros).
 *  - Contactos de retenção (RF-RET-03), só de acrescentar.
 *  - Envio do outbox com repetição: próxima tentativa e último erro (RNF-53).
 *  - Hora oficial dos registos dada pelo relógio da aplicação (RNF-13): as colunas
 *    que tinham DEFAULT now() passam a muntu_now(), que usa `app.now` quando a
 *    transacção o define (igual a now() em produção; fixo nos testes).
 *  - Papel `muntu_worker` para o processo de envio: só consegue saber que
 *    organizações têm mensagens por enviar; o trabalho em si corre dentro de
 *    cada organização, com a mesma Row-Level Security dos pedidos.
 */
export default /* sql */ `
DO $$ BEGIN
  CREATE ROLE muntu_worker NOLOGIN;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
GRANT USAGE ON SCHEMA public TO muntu_worker;

CREATE OR REPLACE FUNCTION muntu_now() RETURNS timestamptz
LANGUAGE sql STABLE AS $$ SELECT coalesce(nullif(current_setting('app.now', true), '')::timestamptz, now()) $$;

-- ----------------------------------------------------- outbox: repetição
ALTER TABLE outbox ADD COLUMN next_attempt_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE outbox ADD COLUMN last_error text;
ALTER TABLE outbox DROP CONSTRAINT outbox_status_check;
ALTER TABLE outbox ADD CONSTRAINT outbox_status_check CHECK (status IN ('pendente','enviado','falhou','cancelado'));
CREATE INDEX outbox_due ON outbox(next_attempt_at) WHERE status = 'pendente';

GRANT SELECT (id, org_id, status, next_attempt_at) ON outbox TO muntu_worker;
GRANT SELECT (id) ON organizations TO muntu_worker;
CREATE POLICY outbox_worker ON outbox FOR SELECT TO muntu_worker USING (true);
CREATE POLICY organizations_worker ON organizations FOR SELECT TO muntu_worker USING (true);

-- ----------------------------------------------------- pendências
CREATE TABLE tasks (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  number integer NOT NULL,
  kind text NOT NULL CHECK (kind IN ('cobranca','documento','reclamacao','reserva','ocorrencia','retencao','outro')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  detail text,
  member_id uuid REFERENCES members(id),
  origin_type text,
  origin_id uuid,
  owner_user_id uuid NOT NULL,
  due_on date,
  status text NOT NULL CHECK (status IN ('aberta','resolvida','cancelada')),
  shifts_passed integer NOT NULL DEFAULT 0,
  created_by uuid NOT NULL,
  resolved_by uuid,
  resolved_at timestamptz,
  resolution text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, number)
);
CREATE INDEX tasks_open ON tasks(org_id, branch_id) WHERE status = 'aberta';
-- O sistema não cria duas pendências abertas para a mesma origem.
CREATE UNIQUE INDEX tasks_origem_aberta ON tasks(org_id, origin_type, origin_id) WHERE status = 'aberta' AND origin_id IS NOT NULL;

CREATE TABLE task_events (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  task_id uuid NOT NULL REFERENCES tasks(id),
  kind text NOT NULL CHECK (kind IN ('criada','nota','transferida','passou_turno','resolvida','cancelada','reaberta')),
  note text,
  from_user uuid,
  to_user uuid,
  by_user uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX task_events_task ON task_events(task_id, created_at);

-- ----------------------------------------------------- avisos à equipa
CREATE TABLE staff_notices (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  branch_id uuid REFERENCES branches(id),
  audience text[] NOT NULL CHECK (cardinality(audience) > 0),
  priority text NOT NULL CHECK (priority IN ('urgente','normal')),
  body text NOT NULL CHECK (char_length(body) BETWEEN 3 AND 600),
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notice_reads (
  org_id uuid NOT NULL REFERENCES organizations(id),
  notice_id uuid NOT NULL REFERENCES staff_notices(id),
  user_id uuid NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (notice_id, user_id)
);

-- ----------------------------------------------------- mensagens a membros
CREATE TABLE message_rules (
  org_id uuid NOT NULL REFERENCES organizations(id),
  kind text NOT NULL,
  enabled boolean NOT NULL,
  channel text NOT NULL CHECK (channel IN ('sms','whatsapp')),
  template text NOT NULL CHECK (char_length(template) BETWEEN 5 AND 480),
  send_hour smallint NOT NULL CHECK (send_hour BETWEEN 0 AND 23),
  updated_by uuid NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (org_id, kind)
);

-- Cada envio a uma pessoa (um outbox pode dar vários: aviso a todos os membros de um plano).
CREATE TABLE message_log (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  outbox_id uuid NOT NULL REFERENCES outbox(id),
  channel text NOT NULL CHECK (channel IN ('sms','whatsapp')),
  template text NOT NULL,
  recipient text NOT NULL,
  member_id uuid REFERENCES members(id),
  body text NOT NULL,
  status text NOT NULL CHECK (status IN ('enviado','entregue','falhou')),
  provider_ref text,
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX message_log_time ON message_log(org_id, created_at DESC);

-- ----------------------------------------------------- notificações na app
CREATE TABLE notifications (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL,
  outbox_id uuid REFERENCES outbox(id),
  kind text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (outbox_id, user_id)
);
CREATE INDEX notifications_user ON notifications(org_id, user_id, created_at DESC);

-- ----------------------------------------------------- retenção
CREATE TABLE member_contacts (
  id uuid PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES organizations(id),
  member_id uuid NOT NULL REFERENCES members(id),
  channel text NOT NULL CHECK (channel IN ('telefone','sms','whatsapp','presencial')),
  reason text CHECK (reason IN ('viagem','lesao','insatisfacao','falta_de_tempo','preco','mudou_de_zona','outro')),
  outcome text NOT NULL CHECK (outcome IN ('sem_resposta','vai_voltar','voltou','cancelou','vai_renovar','renovou','nao_renova')),
  note text,
  by_user uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX member_contacts_member ON member_contacts(member_id, created_at DESC);

-- ----------------------------------------------------- imutabilidade e isolamento
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['task_events','notice_reads','member_contacts'] LOOP
    EXECUTE format('CREATE TRIGGER %I_imutavel BEFORE UPDATE OR DELETE ON %I FOR EACH ROW EXECUTE FUNCTION muntu_somente_acrescentar()', t, t);
    EXECUTE format('CREATE TRIGGER %I_sem_truncate BEFORE TRUNCATE ON %I FOR EACH STATEMENT EXECUTE FUNCTION muntu_somente_acrescentar()', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['tasks','task_events','staff_notices','notice_reads','message_rules','message_log','notifications','member_contacts'] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I_isolamento ON %I USING (org_id = muntu_org()) WITH CHECK (org_id = muntu_org())', t, t);
  END LOOP;
END $$;

GRANT SELECT, INSERT, UPDATE ON tasks, staff_notices, message_rules, message_log, notifications TO muntu_app;
GRANT SELECT, INSERT ON task_events, notice_reads, member_contacts TO muntu_app;

-- ----------------------------------------------------- hora oficial (RNF-13)
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT table_name, column_name FROM information_schema.columns
           WHERE table_schema = 'public' AND column_default = 'now()' AND table_name <> 'schema_migrations' LOOP
    EXECUTE format('ALTER TABLE %I ALTER COLUMN %I SET DEFAULT muntu_now()', r.table_name, r.column_name);
  END LOOP;
END $$;
`;
