# MUNTU · API (backend)

API única para a app mobile, a web mobile e a web desktop. Regras de negócio, dados e integrações.

- **Stack:** Node 24 · TypeScript · NestJS 11 sobre Fastify · Drizzle ORM · PostgreSQL (PGlite em desenvolvimento e testes) · zod.
- **Porquê:** [docs/arquitectura/adr](../docs/arquitectura/adr). **Como está feito:** [docs/arquitectura/backend.md](../docs/arquitectura/backend.md). **O que faz:** [docs/requisitos](../docs/requisitos).

## Arrancar

No Windows, a partir da pasta `scripts`:

| Script | O que faz |
|---|---|
| `backend-instalar.cmd` | Instala as dependências, compila e corre os testes (registo em `scripts\backend.log`) |
| `backend-arrancar.cmd` | Arranca a API em `http://localhost:3000/v1` com a base de dados embutida em `backend\.data` |

Ou na linha de comandos, dentro de `backend/`:

```bash
npm install
npm test          # compila e corre todos os testes (PostgreSQL embutido em memória)
npm run dev       # compila e arranca em http://localhost:3000/v1
```

Configuração por variáveis de ambiente (ver `.env.example`). Sem nada definido, usa o PostgreSQL embutido gravado em `backend/.data`.

### Produção

```bash
DATABASE_URL=postgres://muntu_api:…@host:5432/muntu \
JWT_SECRET=… QR_SECRET=… WEBHOOK_SECRET=… NODE_ENV=production \
npm run build && npm run migrate && npm start
```

O utilizador da base de dados não pode ser `SUPERUSER` nem ter `BYPASSRLS`, e tem de ser membro do papel `muntu_app` (criado pela primeira migração): `GRANT muntu_app TO muntu_api;`.

## Estrutura

```
src/
├─ main.ts, app.ts, app.module.ts   arranque e composição dos módulos
├─ config/        variáveis de ambiente validadas
├─ common/        erros em português, relógio (Luanda), dinheiro em cêntimos, UUID v7
├─ core/          auditoria, regras do dono, contadores, outbox (SMS/push)
├─ db/            ligação (PostgreSQL ou PGlite), esquema Drizzle, migrações SQL
├─ auth/          criar ginásio, entrar, renovar, equipa, guarda de sessão e perfis
├─ members/       membros, planos, subscrições, teste grátis
├─ cash/          caixa por turno, movimentos, fecho cego, receber turno
├─ payments/      pagamentos, webhook do agregador, estornos
├─ invoices/      facturas (FR, FT, NC), séries, cadeia de hash
├─ approvals/     pedidos de aprovação e decisão com senha
├─ access/        QR dinâmico, regras de entrada, lotação, presentes
└─ incidents/     ocorrências
test/             testes de API e de regras (node --test)
```

## API (v1)

Todas as rotas têm o prefixo `/v1` e, salvo indicação, exigem `Authorization: Bearer <token>`.
Os erros vêm sempre como `{ code, message, details }`, com `message` em português para mostrar ao utilizador.
Valores em **cêntimos** (`3000000` = 30 000,00 Kz).

| Método | Rota | Quem | O quê |
|---|---|---|---|
| GET | `/saude` | público | Estado da API |
| POST | `/auth/registar-ginasio` | público | Cria dono, ginásio, filiais e séries de facturação |
| POST | `/auth/entrar` | público | Telemóvel + senha → tokens |
| POST | `/auth/renovar` · `/auth/sair` | público | Rodar / revogar a sessão |
| POST | `/auth/senha` | todos | Trocar a senha |
| GET | `/auth/eu` | todos | Perfil, organização e filiais da sessão |
| POST | `/equipa` | gerente, dono | Convidar funcionário (senha temporária por SMS) |
| GET | `/filiais` | todos | Filiais da organização |
| GET · POST | `/planos` | todos · gerente | Listar · criar planos |
| PATCH | `/planos/:id/preco` | gerente | Muda já sem membros activos; com activos pede aprovação ao dono |
| GET · POST | `/membros` | equipa · recepção | Pesquisar · inscrever (com detecção de duplicados) |
| GET | `/membros/:id` | equipa ou o próprio | Ficha com estado, subscrições, entradas, pagamentos |
| POST | `/membros/:id/subscricoes` | recepção | Nova subscrição (pendente; teste grátis activa já) |
| POST | `/pagamentos` | recepção, finanças, membro (Express) | Cobrar (idempotente por `chaveIdempotencia`) |
| POST | `/pagamentos/:id/confirmar` | finanças | Confirmar pagamento electrónico com comprovativo |
| POST | `/integracoes/pagamentos/webhook` | agregador (assinado) | Confirmação/falha do Express e referências |
| GET | `/facturas` | equipa | Facturas emitidas |
| POST | `/caixa/turnos` | recepção | Abrir caixa com fundo |
| GET | `/caixa/turnos/actual?filialId=` | recepção, finanças | Turno aberto (esperado só para finanças/gerência) |
| GET | `/caixa/turnos?filialId=` | recepção, finanças | Histórico de turnos e contagens |
| POST | `/caixa/turnos/:id/movimentos` | recepção | Sangria, reforço ou despesa (despesa acima do limite → aprovação) |
| POST | `/caixa/turnos/:id/fecho` | recepção | Fecho cego |
| POST | `/caixa/turnos/:id/receber` | recepção | Receber o turno (contagem cega + assinatura) |
| GET · POST | `/aprovacoes` | todos | Pedidos pendentes · novo pedido |
| POST | `/aprovacoes/:id/decisao` | gerente, finanças, dono | Aprovar ou recusar com a senha |
| GET | `/acessos/qr` | membro | QR dinâmico (30 s) |
| POST | `/acessos/validar` | recepção, vigilante | Entra / não entra e o motivo |
| POST | `/acessos/manual` | recepção | Entrada manual com motivo (bloqueado → aprovação) |
| GET | `/acessos/lotacao/:filialId` | todos | Lotação ao vivo |
| GET | `/acessos/presentes?filialId=` | equipa | Membros dentro agora |
| GET · POST | `/ocorrencias` | todos | Listar · reportar |
| PATCH | `/ocorrencias/:id/estado` | equipa | Em análise / resolvida (avisa o membro) |

## Testes

`npm test` compila e corre testes de regras puras e de API contra a aplicação real, com PostgreSQL embutido em memória e relógio fixo. Cobrem isolamento entre ginásios (RLS), registos imutáveis, inscrição e pagamento, facturação sequencial, idempotência, webhook assinado, descontos e aprovações, estornos com nota de crédito, fecho cego e passagem de turno, regras de acesso e QR, e ocorrências.

## Em falta (próximos passos)

- Comunicação real com a AGT (especificação técnica a confirmar, ver `docs/requisitos/06-questoes-em-aberto.md`) e exportação SAF-T (AO).
- Envio do outbox (SMS, push, WhatsApp) por um processo agendado, com repetição.
- Pendências e tarefas, avisos à equipa, regras de mensagens, aulas e PT, retenção, painel do dono, importação de planilhas, exportação de dados.
- Sincronização em lote para o modo sem rede.
- Documento OpenAPI gerado.
