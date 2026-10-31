# ADR 0002 · PostgreSQL com Drizzle ORM (e PGlite em desenvolvimento)

**Estado:** aceite · 30 Out 2026

## Contexto

O MUNTU guarda dinheiro, facturas com numeração legal e uma trilha de auditoria que não pode ser alterada. Serve muitos ginásios na mesma instalação, que não podem ver dados uns dos outros. Os relatórios do dono cruzam filiais, períodos e planos (esperado vs. recebido, ocupação por hora, churn).

## Base de dados

**PostgreSQL**, porque oferece de origem o que o domínio pede:
- transacções fortes e `SELECT … FOR UPDATE` para numeração de facturas sem falhas;
- **Row-Level Security** para isolar ginásios na própria base de dados;
- triggers para tornar tabelas só de acrescentar;
- `jsonb`, índices parciais, funções de janela e agregações para relatórios;
- recuperação até um ponto no tempo nos serviços geridos.

**PGlite** (PostgreSQL em WebAssembly) em desenvolvimento e nos testes: o mesmo motor, sem instalar o PostgreSQL nem o Docker. Os testes exercitam as mesmas políticas e triggers de produção.

## ORM

| Opção | A favor | Contra |
|---|---|---|
| **Drizzle** | Consultas próximas do SQL e tipadas; sem motor externo nem geração de código em tempo de execução; transacções e SQL directo simples; suporta PostgreSQL, postgres.js e PGlite com o mesmo esquema | Mais novo; menos "mágico" |
| Prisma | Excelente experiência e migrações | RLS exige contorno por pedido; relatórios caem em SQL cru; camada extra entre a aplicação e o SQL |
| TypeORM | Muito usado com NestJS | Tipagem fraca nas consultas; histórico de problemas em migrações e relações |
| MikroORM | Unit of work, bom para DDD | Abstracção pesada para um domínio que é sobretudo transacções e registos imutáveis |

**Decisão:** Drizzle ORM com o driver `postgres` (postgres.js) em produção e `@electric-sql/pglite` em desenvolvimento.

## Migrações

As migrações são **SQL escrito à mão** (`src/db/migrations`), aplicadas por ordem e registadas em `schema_migrations`. Assim, RLS, triggers, papéis e índices parciais ficam explícitos e revistos. `src/db/schema.ts` é o espelho tipado para as consultas. Uma migração aplicada nunca se altera; cria-se outra (RNF-71).

## Consequências

- Dinheiro em `bigint` (cêntimos), com `mode: 'number'` no Drizzle (seguro até 90 biliões de kwanzas).
- Consultas de relatório podem usar SQL directo (`sql\`…\``) sem sair do Drizzle.
- O PGlite tem uma só ligação: o código nunca abre transacções encaixadas (a criação de contas faz-se antes da transacção da organização).
