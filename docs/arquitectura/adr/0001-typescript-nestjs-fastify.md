# ADR 0001 · TypeScript com NestJS sobre Fastify

**Estado:** aceite · 30 Out 2026

## Contexto

O backend do MUNTU tem de servir três superfícies (app mobile, web mobile, web desktop) com as mesmas regras. O domínio é largo e vai crescer por fases: caixa e turnos, facturação AGT, aprovações, acessos, aulas, PT, retenção, multi-filial e, mais tarde, uma rede de ginásios e uma API aberta. Precisa de: permissões por perfil e filial em cada operação, tarefas agendadas (lembretes D-5/D-1/D-0, bloqueios, liquidações), tempo real (lotação, aprovações), filas para integrações e contrato de API documentado.

## Opções consideradas

| Opção | A favor | Contra |
|---|---|---|
| **NestJS + Fastify (TypeScript)** | Módulos, injecção de dependências, guardas e filtros prontos para RBAC e auditoria; agendamento, WebSockets, filas e OpenAPI oficiais; muito usado, fácil contratar no mundo lusófono; Fastify é rápido | Mais cerimónia que um micro-framework; usa decoradores |
| Fastify ou Hono "puro" | Leve e rápido | Teríamos de inventar e manter as convenções de módulos, permissões, agendamento e documentação |
| AdonisJS | Completo, ORM próprio | Menos usado; prende ao ORM do framework |
| Django / Laravel / Spring | Maduros | Segunda linguagem na equipa; perde-se a partilha de tipos e de regras com as apps em TypeScript |
| Go / Elixir | Desempenho, concorrência | Segunda linguagem; o gargalo do MUNTU é a base de dados e as integrações, não a CPU |

## Decisão

NestJS 11 com o adaptador Fastify, em TypeScript, Node 24 LTS.

- A mesma linguagem das apps: tipos, validações (zod) e regras puras (formatação de kwanzas, contagem de caixa, estado do membro) podem passar para `packages/shared`.
- A estrutura por módulos espelha os módulos dos requisitos, o que torna cada fase uma adição e não uma reescrita.
- Guardas globais aplicam sessão e perfil em todos os endpoints por omissão (endpoints públicos são explícitos com `@Public()`).

## Consequências

- O backend vive em `backend/`, com o seu próprio `package.json`, fora dos workspaces das apps (não interfere com a instalação do Expo).
- Só dependências em JavaScript puro (sem módulos nativos): a mesma instalação corre em Windows, Linux e na nuvem. Senhas com `scrypt` do Node em vez de bcrypt/argon2 nativos.
- Testes com o executor nativo do Node (`node --test`) sobre o código compilado, sem ferramentas com binários por plataforma.
