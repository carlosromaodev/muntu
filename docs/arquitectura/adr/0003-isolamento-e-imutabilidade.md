# ADR 0003 · Isolamento por Row-Level Security e registos só de acrescentar

**Estado:** aceite · 30 Out 2026

## Contexto

Princípios P2 ("nada se apaga") e RNF-01 (isolamento entre ginásios). Garantir isto só no código da aplicação depende de nunca haver um filtro esquecido nem um `UPDATE` indevido.

## Decisão

1. **Uma base de dados partilhada**, com `org_id` em todas as tabelas do ginásio e políticas RLS com `FORCE ROW LEVEL SECURITY`. Cada pedido corre numa transacção com `SET LOCAL ROLE muntu_app` e `set_config('app.org_id', …, true)`.
2. **Tabelas só de acrescentar** (livro razão, contagens, facturas, eventos AGT, entradas, eventos de ocorrências, auditoria): trigger que recusa `UPDATE`/`DELETE`/`TRUNCATE` e o papel da aplicação só com `SELECT, INSERT`.
3. **Estado que muda** (subscrições, turnos, pedidos de aprovação, ocorrências) fica em tabelas normais, mas cada mudança grava um evento na auditoria com o antes e o depois.
4. `users` e `refresh_tokens` são tabelas do sistema de autenticação: sem RLS e acessíveis só ao serviço de autenticação, fora do papel `muntu_app` (que só lê `id`, `phone`, `name` dos utilizadores).

## Alternativas

- Uma base de dados por ginásio: isolamento forte, mas migrações, ligações e relatórios da rede ficam muito mais caros.
- Esquema por ginásio: mesmos problemas, em menor grau.

## Consequências

- Um erro de filtro no código devolve **zero linhas**, não dados de outro ginásio.
- O utilizador da base de dados em produção não pode ser `SUPERUSER` nem ter `BYPASSRLS`.
- Correcções de dinheiro são sempre registos novos (estorno, nota de crédito), como a lei e o brief exigem.
