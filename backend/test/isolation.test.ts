import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { sql } from 'drizzle-orm';
import { members } from '../src/db/schema.js';
import { enrollPaid, gym, setup, type Gym, type T } from './helpers.js';

/** O Drizzle embrulha o erro do PostgreSQL em `cause`. */
const pgError = (re: RegExp) => (e: unknown) => re.test(String((e as { cause?: { message?: string } })?.cause?.message ?? (e as Error).message));

describe('Isolamento entre ginásios e registos imutáveis', () => {
  let t: T;
  let a: Gym;
  let b: Gym;
  let memberA: string;
  before(async () => {
    t = await setup();
    a = await gym(t, 'Mwangolé Fit');
    b = await gym(t, 'Kianda Fitness');
    memberA = (await enrollPaid(t, a)).member.id;
  });
  after(() => t.close());

  it('outro ginásio não vê o membro (404, não 403)', async () => {
    const r = await t.call('GET', `/membros/${memberA}`, undefined, b.dono);
    assert.equal(r.status, 404);
  });

  it('a pesquisa de outro ginásio não devolve membros alheios', async () => {
    const r = await t.call('GET', '/membros?q=Kátia', undefined, b.dono);
    assert.equal(r.status, 200);
    assert.equal(r.body.length, 0);
  });

  it('a base de dados recusa ler linhas de outra organização mesmo sem filtro na aplicação (RLS)', async () => {
    const rows = await t.database.withOrg({ orgId: b.orgId, userId: '00000000-0000-7000-8000-000000000001' }, (tx) => tx.select().from(members));
    assert.equal(rows.filter((m) => m.orgId === a.orgId).length, 0);
  });

  it('a base de dados recusa escrever na organização errada', async () => {
    await assert.rejects(
      t.database.withOrg({ orgId: b.orgId, userId: '00000000-0000-7000-8000-000000000001' }, (tx) => tx.insert(members).values({ id: '00000000-0000-7000-8000-0000000000aa', orgId: a.orgId, number: 1, name: 'Intruso', phone: '923000000', baseBranchId: a.talatona })),
    );
  });

  it('o livro razão não aceita UPDATE nem DELETE', async () => {
    await assert.rejects(t.database.withOrg({ orgId: a.orgId, userId: '00000000-0000-7000-8000-000000000001' }, (tx) => tx.execute(sql`UPDATE cash_movements SET amount_cents = 0`)), pgError(/imutável|permission denied/));
    await assert.rejects(t.database.system((tx) => tx.execute(sql`DELETE FROM cash_movements`)), pgError(/imutável/));
    await assert.rejects(t.database.system((tx) => tx.execute(sql`UPDATE invoices SET total_cents = 1`)), pgError(/imutável/));
  });
});
