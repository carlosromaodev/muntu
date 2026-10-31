import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { enrollPaid, gym, setup, type Gym, type T } from './helpers.js';

describe('Aprovações e estornos', () => {
  let t: T;
  let g: Gym;
  let movementId: string;
  before(async () => {
    t = await setup();
    g = await gym(t);
    await enrollPaid(t, g);
    const cur = await t.call('GET', `/caixa/turnos/actual?filialId=${g.talatona}`, undefined, g.financas.token);
    movementId = cur.body.movements.find((m: any) => m.kind === 'pagamento').id;
  });
  after(() => t.close());

  it('a recepção pede o estorno; o pedido exige o dono (limite de finanças = nenhum)', async () => {
    const r = await t.call('POST', '/aprovacoes', { tipo: 'estorno', dados: { movementId }, valorCentimos: 1, motivo: 'Cobrança duplicada no TPA' }, g.rececao.token);
    assert.equal(r.status, 201);
    assert.equal(r.body.requiredRole, 'dono');
    assert.equal(r.body.amountCents, 3_000_000, 'o valor vem do movimento, não do cliente');
  });

  it('ninguém decide o próprio pedido; finanças não decide pedidos do dono', async () => {
    const list = await t.call('GET', '/aprovacoes', undefined, g.dono);
    const req = list.body[0];
    assert.equal(req.podeDecidir, true);
    const fin = await t.call('POST', `/aprovacoes/${req.id}/decisao`, { aprovar: true, senha: g.financas.password }, g.financas.token);
    assert.equal(fin.status, 403);
    const own = await t.call('POST', '/aprovacoes', { tipo: 'reabrir_caixa', dados: { shiftId: g.shiftId }, motivo: 'Teste de auto-aprovação' }, g.dono);
    const self = await t.call('POST', `/aprovacoes/${own.body.id}/decisao`, { aprovar: true, senha: g.donoPassword }, g.dono);
    assert.equal(self.status, 403);
  });

  it('aprovar exige a senha; aprovado, cria o movimento inverso e a nota de crédito', async () => {
    const list = await t.call('GET', '/aprovacoes', undefined, g.dono);
    const req = list.body.find((r: any) => r.kind === 'estorno');
    const bad = await t.call('POST', `/aprovacoes/${req.id}/decisao`, { aprovar: true, senha: 'errada' }, g.dono);
    assert.equal(bad.status, 401);
    const ok = await t.call('POST', `/aprovacoes/${req.id}/decisao`, { aprovar: true, senha: g.donoPassword }, g.dono);
    assert.equal(ok.status, 200);
    assert.match(ok.body.result.creditNote, /^NC TAL2026\/1$/);
    const cur = await t.call('GET', `/caixa/turnos/actual?filialId=${g.talatona}`, undefined, g.financas.token);
    assert.equal(cur.body.expectedCashCents, 2_000_000, 'o estorno devolve o dinheiro do pagamento');
    const original = cur.body.movements.find((m: any) => m.id === movementId);
    assert.equal(original.amountCents, 3_000_000, 'o movimento original não muda');
  });

  it('não se estorna duas vezes o mesmo movimento', async () => {
    const r = await t.call('POST', '/aprovacoes', { tipo: 'estorno', dados: { movementId }, motivo: 'Outra vez' }, g.rececao.token);
    assert.equal(r.status, 409);
    assert.equal(r.body.code, 'JA_ESTORNADO');
  });

  it('pedido decidido não se decide de novo; pedido expira em 48 h', async () => {
    const list = await t.call('GET', '/aprovacoes?estado=todos', undefined, g.dono);
    const done = list.body.find((r: any) => r.kind === 'estorno');
    const again = await t.call('POST', `/aprovacoes/${done.id}/decisao`, { aprovar: false, senha: g.donoPassword, motivo: 'Mudei de ideias' }, g.dono);
    assert.equal(again.body.code, 'PEDIDO_JA_DECIDIDO');
    const r = await t.call('POST', '/aprovacoes', { tipo: 'reabrir_caixa', dados: { shiftId: g.shiftId }, motivo: 'Faltou registar uma venda' }, g.rececao.token);
    t.clock.set(new Date('2026-11-01T10:00:00+01:00'));
    const late = await t.call('POST', `/aprovacoes/${r.body.id}/decisao`, { aprovar: true, senha: g.donoPassword }, g.dono);
    assert.equal(late.body.code, 'PEDIDO_EXPIRADO');
    const all = await t.call('GET', '/aprovacoes?estado=todos', undefined, g.dono);
    assert.equal(all.body.find((x: any) => x.id === r.body.id).status, 'expirado', 'o estado expirado fica gravado');
    t.clock.set(new Date('2026-10-30T09:00:00+01:00'));
  });

  it('preço de plano com membros activos vai a aprovação do dono (RN-23)', async () => {
    const r = await t.call('PATCH', `/planos/${g.planId}/preco`, { precoCentimos: 3_500_000, motivo: 'Actualização anual de preços' }, g.gerente.token);
    assert.equal(r.body.aplicado, false);
    assert.equal(r.body.aprovacao.requiredRole, 'dono');
    const ok = await t.call('POST', `/aprovacoes/${r.body.aprovacao.id}/decisao`, { aprovar: true, senha: g.donoPassword }, g.dono);
    assert.equal(ok.body.result.priceCents, 3_500_000);
  });
});
