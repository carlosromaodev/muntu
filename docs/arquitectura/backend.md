# Arquitectura do backend

Código em [`backend/`](../../backend), separado das apps. As decisões estão registadas em [adr/](adr/).

## Visão geral

```
 App mobile (iOS/Android/web)      Web desktop
            │                          │
            └──────────── HTTPS /v1 ───┘
                           │
                 ┌─────────▼─────────┐
                 │   API MUNTU        │  NestJS sobre Fastify (Node 24, TypeScript)
                 │  guarda de sessão  │  token de acesso 15 min + renovação rodada
                 │  módulos por domínio│
                 └──┬───────┬───────┬─┘
                    │       │       │
           PostgreSQL   outbox   integrações (fila)
           RLS + só-acrescentar  │  AGT · agregador Multicaixa · SMS · WhatsApp
```

- **Uma fonte de verdade.** As apps mostram e pedem; o servidor valida perfil, filial, limites e regras (RNF-02).
- **Módulos por domínio** (RNF-70): cada módulo tem controlador (HTTP), serviço (regras) e acesso às suas tabelas. Um módulo usa outro só pelo serviço exportado.

## Módulos do MVP

| Módulo | Pasta | Responsabilidade | Requisitos |
|---|---|---|---|
| Core | `core/` | Configuração, base de dados, relógio, auditoria, regras do dono, contadores, outbox | RF-AUD, RNF-52/53 |
| Autenticação | `auth/` | Criar ginásio, entrar, renovar, sair, equipa, confirmação por senha | RF-AUT, RF-ORG-01, RF-EQP-01 |
| Membros e planos | `members/` | Membros, duplicados, pesquisa, estado, planos, subscrições, teste grátis | RF-MEM, RF-PLA, RF-INS |
| Caixa e turnos | `cash/` | Abrir caixa, sangria/reforço/despesa, fecho cego, receber turno | RF-CAI, RF-TUR |
| Pagamentos e facturas | `payments/`, `invoices/` | Cobrar, confirmar (webhook), factura-recibo, nota de crédito, estornos | RF-PAG, RF-FAC |
| Aprovações | `approvals/` | Pedidos, níveis de aprovação, decisão com senha, execução | RF-APR |
| Acessos | `access/` | QR dinâmico, regras de entrada, anti-passback, manual, lotação, presentes | RF-ACE |
| Ocorrências | `incidents/` | Reportar, urgência, estados, avisos | RF-OCO |
| Pendências | `tasks/` | Pendências com responsável, histórico só de acrescentar, passagem de turno | RF-PEN-01/02, RF-TUR-04, RN-54, RN-64 |
| Avisos à equipa | `notices/` | Avisos por público e filial, confirmação de leitura | RF-AVI-01 |
| Mensagens | `messaging/` | Regras e modelos, lembretes, envio do outbox com repetição, registo, notificações na app | RF-AVI-02/03/04, RN-75/76, RNF-53 |
| Relatórios | `reports/` | Painel do dono, esperado vs. recebido, financeiro do dia, renovações, alertas de fuga | RF-REL-01/02, RF-PER-02/03, RF-RET-02 |
| Retenção | `retention/` | Membros em risco com sinais explicáveis, contactos | RF-RET-01/03 |

Próximos módulos (mesma estrutura): aulas e PT, indicações, marca, cofre de documentos, importação, exportação.

## Dados

- **PostgreSQL** em produção; **PGlite** (PostgreSQL compilado para WebAssembly) em desenvolvimento e testes: o mesmo SQL, os mesmos triggers e a mesma Row-Level Security, sem instalar nada.
- **Migrações em SQL** (`src/db/migrations`) são a fonte de verdade; `src/db/schema.ts` dá tipos às consultas do Drizzle.
- **Identificadores UUID v7** gerados pela aplicação (e pelas apps, para registos criados sem rede).
- **Dinheiro em cêntimos** (`bigint`). Datas de regras de negócio em Africa/Luanda; horas em UTC.

### Isolamento entre ginásios (RNF-01)

Cada pedido corre numa transacção com `SET LOCAL ROLE muntu_app` e `app.org_id` definido. As políticas de Row-Level Security (`FORCE`) só deixam ver e escrever linhas dessa organização. Um esquecimento de filtro no código devolve zero linhas em vez de dados de outro ginásio. Testado em `test/isolation.test.ts`.

Em produção a ligação usa um utilizador **sem** `SUPERUSER`/`BYPASSRLS`, membro do papel `muntu_app`:

```sql
CREATE ROLE muntu_api LOGIN PASSWORD '…';
GRANT muntu_app TO muntu_api;
```

### Registos imutáveis (RNF-20)

`cash_movements`, `shift_counts`, `invoices`, `invoice_agt_events`, `checkins`, `incident_events` e `audit_log` têm triggers que recusam `UPDATE`, `DELETE` e `TRUNCATE`, e o papel da aplicação só tem `SELECT, INSERT`. Corrige-se com estorno (movimento inverso ligado ao original) ou nota de crédito.

### Hora oficial (RNF-13)

As colunas de data dos registos usam `muntu_now()`, que devolve `app.now` quando a transacção o define e `now()` caso contrário. Cada transacção da aplicação define `app.now` com o relógio do servidor, por isso em produção é igual a `now()` e nos testes acompanha o relógio fixo.

## Envio de mensagens

```
 facto (pagamento, aviso, aprovação…) ──► outbox (mesma transacção)
 lembretes (agendador, RN-75)        ──►   │
                                           ▼
                              agendador (WORKER_ENABLED, a cada 30 s)
                                           │
              push ──► notificações na app │ sms/whatsapp ──► fornecedor ──► message_log
```

- **Regras** (`message_rules`): ligar/desligar, canal, modelo e hora de envio por organização; sem registo, valem as de omissão (`messaging/templates.ts`). Uma regra desligada cancela as mensagens dessa regra ainda por enviar.
- **Lembretes**: 3 dias antes, no dia, 3 dias depois e no fim da tolerância, boas-vindas, aniversário e saudades. Cada um tem uma chave única (regra + subscrição + data): correr o agendador mais vezes nunca duplica.
- **Repetição**: falha temporária → nova tentativa em 1, 5, 15, 60 min; à 5.ª falha fica `falhou`. Quem já recebeu não recebe outra vez.
- **Isolamento**: o agendador usa o papel `muntu_worker`, que só vê que organizações têm mensagens por enviar; o envio corre dentro de cada organização com a mesma RLS dos pedidos. Em produção: `GRANT muntu_worker TO muntu_api;`.

## Fluxos principais

**Inscrição e pagamento.** `POST /membros` → `POST /membros/:id/subscricoes` (pendente) → `POST /pagamentos`. Dinheiro e TPA confirmam logo (exigem caixa aberto); Express e referência ficam pendentes até ao webhook assinado. Confirmar = movimento no livro razão + activar subscrição + factura-recibo + SMS, na mesma transacção.

**Fecho cego e passagem de turno.** `POST /caixa/turnos/:id/receber` com as quantidades por nota e moeda e o valor avulso. A primeira submissão revela a diferença; com diferença é preciso decidir (ressalva ou revisão), justificar e assinar com a senha. O turno anterior fecha sem ser alterado e o novo abre com o dinheiro contado.

**Aprovações.** Um módulo pede (`requestInTx`) e regista o que acontece ao aprovar (`register(kind, handler)`); o pedido fica pendente, o aprovador certo é calculado pelas regras do dono, e a decisão exige a senha. Ninguém aprova o próprio pedido.

**Passagem de turno.** Quem recebe vê `GET /caixa/turnos/:id/resumo` (totais por meio, pendências abertas, ocorrências do turno). Ao assinar, as pendências de quem entregou passam para quem recebeu (`passou_turno` no histórico).

**Acesso.** `GET /acessos/qr` (membro) devolve um token assinado de 30 s. `POST /acessos/validar` avalia estado, âmbito, horário, anti-passback e lotação, regista a entrada e devolve "entra/não entra" e o motivo.

## Funcionamento sem rede (fase 2)

O servidor já está preparado:
- ids gerados no cliente (UUID v7) e **chave de idempotência** em cada escrita de dinheiro;
- `device_at` guarda a hora do dispositivo, `created_at` a do servidor;
- livro razão só de acrescentar: sincronizar é enviar movimentos, nunca sobrepor.

Falta o lado das apps (fila local e cache de validação de acessos) e um endpoint de sincronização em lote.

## Segurança

- Senhas com scrypt; tokens de acesso HS256 de 15 min; renovação opaca, guardada como hash, rodada a cada uso, com revogação da família se um token usado reaparecer.
- Acções sensíveis (aprovar, assinar turno) confirmam a senha no servidor.
- Webhooks com assinatura HMAC e idempotentes.
- Respostas de erro com código estável e mensagem em português; nunca detalhes internos.

## Correr

Ver [backend/README.md](../../backend/README.md).
