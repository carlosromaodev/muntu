import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { enroll, enrollPaid, gym, key, phone, setup, type Gym, type T } from './helpers.js';

describe('Inscrição, pagamento, factura e acesso', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
  });
  after(() => t.close());

  it('detecta duplicados por telefone', async () => {
    const tel = phone();
    const a = await t.call('POST', '/membros', { nome: 'Ana Domingos', telefone: tel, filialId: g.talatona, consentimento: true }, g.rececao.token);
    assert.equal(a.status, 201);
    const b = await t.call('POST', '/membros', { nome: 'Ana D.', telefone: tel, filialId: g.talatona, consentimento: true }, g.rececao.token);
    assert.equal(b.status, 409);
    assert.equal(b.body.code, 'MEMBRO_DUPLICADO');
    assert.equal(b.body.details.membroId, a.body.id);
  });

  it('sem pagamento não há acesso (RN-01)', async () => {
    const e = await enroll(t, g);
    assert.equal(e.sub.status, 'pendente');
    const v = await t.call('POST', '/acessos/validar', { filialId: g.talatona, membroId: e.member.id }, g.rececao.token);
    assert.equal(v.body.entra, false);
    assert.equal(v.body.motivo, 'Plano à espera de pagamento.');
  });

  it('paga em dinheiro: activa a subscrição e emite a factura-recibo com numeração sequencial', async () => {
    const one = await enrollPaid(t, g);
    assert.equal(one.payment.status, 'confirmado');
    assert.match(one.payment.factura.numero, /^FR TAL2026\/\d+$/);
    const two = await enrollPaid(t, g);
    const n1 = Number(one.payment.factura.numero.split('/')[1]);
    const n2 = Number(two.payment.factura.numero.split('/')[1]);
    assert.equal(n2, n1 + 1);
    const ficha = await t.call('GET', `/membros/${one.member.id}`, undefined, g.rececao.token);
    assert.equal(ficha.body.status, 'pago');
    assert.equal(ficha.body.current.startsOn, '2026-10-30');
    assert.equal(ficha.body.current.endsOn, '2026-11-28');
  });

  it('repetir o mesmo pedido de pagamento não cobra duas vezes (idempotência)', async () => {
    const e = await enroll(t, g);
    const body = { filialId: g.talatona, membroId: e.member.id, subscricaoId: e.sub.id, meio: 'dinheiro', valorCentimos: 3_000_000, chaveIdempotencia: key() };
    const a = await t.call('POST', '/pagamentos', body, g.rececao.token);
    const b = await t.call('POST', '/pagamentos', body, g.rececao.token);
    assert.equal(a.body.id, b.body.id);
    assert.equal(b.body.repetido, true);
  });

  it('valor diferente do preço é recusado com o valor certo', async () => {
    const e = await enroll(t, g);
    const r = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: e.sub.id, meio: 'tpa', valorCentimos: 2_500_000, chaveIdempotencia: key() }, g.rececao.token);
    assert.equal(r.status, 400);
    assert.equal(r.body.code, 'VALOR_DIFERENTE');
    assert.equal(r.body.details.valorCentimos, 3_000_000);
  });

  it('desconto até ao limite da recepção (10%) aplica-se; acima disso pede aprovação', async () => {
    const e = await enroll(t, g);
    const ok = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: e.sub.id, meio: 'dinheiro', valorCentimos: 2_700_000, descontoPct: 10, chaveIdempotencia: key() }, g.rececao.token);
    assert.equal(ok.status, 201);
    const e2 = await enroll(t, g);
    const no = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: e2.sub.id, meio: 'dinheiro', valorCentimos: 2_400_000, descontoPct: 20, chaveIdempotencia: key() }, g.rececao.token);
    assert.equal(no.status, 409);
    assert.equal(no.body.code, 'DESCONTO_ACIMA_DO_LIMITE');
    const req = await t.call('POST', '/aprovacoes', { tipo: 'desconto', dados: { subscriptionId: e2.sub.id, pct: 20 }, motivo: 'Cliente fiel há três anos' }, g.rececao.token);
    assert.equal(req.body.requiredRole, 'gerente');
    const dec = await t.call('POST', `/aprovacoes/${req.body.id}/decisao`, { aprovar: true, senha: g.gerente.password }, g.gerente.token);
    assert.equal(dec.status, 200);
    const paid = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: e2.sub.id, meio: 'dinheiro', valorCentimos: 2_400_000, chaveIdempotencia: key() }, g.rececao.token);
    assert.equal(paid.status, 201);
  });

  it('Express fica pendente até ao webhook assinado do agregador', async () => {
    const e = await enroll(t, g);
    const p = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: e.sub.id, meio: 'express', valorCentimos: 3_000_000, chaveIdempotencia: key() }, g.rececao.token);
    assert.equal(p.body.status, 'pendente');
    const { webhookSignature } = await import('../src/payments/payments.service.js');
    const body = { orgId: g.orgId, paymentId: p.body.id, status: 'confirmado' as const, amountCents: 3_000_000, externalRef: 'EXP-77812' };
    const bad = await t.app.inject({ method: 'POST', url: '/v1/integracoes/pagamentos/webhook', payload: body, headers: { 'x-muntu-assinatura': 'ab'.repeat(32) } });
    assert.equal(bad.statusCode, 401);
    const good = await t.app.inject({ method: 'POST', url: '/v1/integracoes/pagamentos/webhook', payload: body, headers: { 'x-muntu-assinatura': webhookSignature(t.env.WEBHOOK_SECRET, body) } });
    assert.equal(good.json().status, 'confirmado');
    const again = await t.app.inject({ method: 'POST', url: '/v1/integracoes/pagamentos/webhook', payload: body, headers: { 'x-muntu-assinatura': webhookSignature(t.env.WEBHOOK_SECRET, body) } });
    assert.equal(again.json().repetido, true);
    const ficha = await t.call('GET', `/membros/${e.member.id}`, undefined, g.rececao.token);
    assert.equal(ficha.body.status, 'pago');
  });

  it('acesso: entra, anti-passback recusa a segunda entrada, plano local não entra noutra filial', async () => {
    const e = await enrollPaid(t, g);
    const v1 = await t.call('POST', '/acessos/validar', { filialId: g.talatona, membroId: e.member.id }, g.rececao.token);
    assert.equal(v1.body.entra, true);
    const v2 = await t.call('POST', '/acessos/validar', { filialId: g.talatona, membroId: e.member.id }, g.rececao.token);
    assert.equal(v2.body.entra, false);
    assert.match(v2.body.motivo, /Já entrou há/);
    t.clock.set(new Date('2026-10-30T12:00:00+01:00'));
    const dono = await t.call('POST', '/acessos/validar', { filialId: g.kilamba, membroId: e.member.id }, g.dono);
    assert.equal(dono.body.entra, false);
    assert.equal(dono.body.motivo, 'O plano não dá acesso a esta filial.');
    t.clock.set(new Date('2026-10-30T09:00:00+01:00'));
  });

  it('QR dinâmico: válido 30 s (+30 s de tolerância), depois expira', async () => {
    const tel = phone();
    const m = await t.call('POST', '/membros', { nome: 'Délcio Ngola', telefone: tel, filialId: g.talatona, consentimento: true, criarConta: true }, g.rececao.token);
    const s = await t.call('POST', `/membros/${m.body.id}/subscricoes`, { planoId: g.redeId }, g.rececao.token);
    await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: s.body.id, meio: 'dinheiro', valorCentimos: 4_500_000, chaveIdempotencia: key() }, g.rececao.token);
    const login = await t.call('POST', '/auth/entrar', { telefone: tel, senha: m.body.tempPassword });
    assert.deepEqual(login.body.roles, ['membro']);
    const qr = await t.call('GET', '/acessos/qr', undefined, login.body.accessToken);
    assert.equal(qr.status, 200);
    t.clock.set(new Date('2026-10-30T09:01:30+01:00'));
    const late = await t.call('POST', '/acessos/validar', { filialId: g.talatona, qr: qr.body.token }, g.rececao.token);
    assert.equal(late.status, 400);
    assert.equal(late.body.code, 'QR_INVALIDO');
    const fresh = await t.call('GET', '/acessos/qr', undefined, login.body.accessToken);
    const ok = await t.call('POST', '/acessos/validar', { filialId: g.kilamba, qr: fresh.body.token }, g.dono);
    assert.equal(ok.body.entra, true, 'plano de rede entra noutra filial');
    t.clock.set(new Date('2026-10-30T09:00:00+01:00'));
  });

  it('teste grátis: um por BI e telefone (RN-09)', async () => {
    const bi = '004455667LA042';
    const m = await t.call('POST', '/membros', { nome: 'Sara Lopes', telefone: phone(), bi, filialId: g.talatona, consentimento: true }, g.rececao.token);
    const s1 = await t.call('POST', `/membros/${m.body.id}/subscricoes`, { planoId: g.testeId }, g.rececao.token);
    assert.equal(s1.body.status, 'activa');
    assert.equal(s1.body.endsOn, '2026-11-05');
    const s2 = await t.call('POST', `/membros/${m.body.id}/subscricoes`, { planoId: g.testeId }, g.rececao.token);
    assert.equal(s2.status, 409);
    assert.equal(s2.body.code, 'TESTE_JA_USADO');
  });

  it('estado do membro: em dívida dentro da tolerância, bloqueado depois', async () => {
    const e = await enrollPaid(t, g);
    t.clock.set(new Date('2026-12-02T10:00:00+01:00'));
    const a = await t.call('GET', `/membros/${e.member.id}`, undefined, g.rececao.token);
    assert.equal(a.body.status, 'em_divida');
    t.clock.set(new Date('2026-12-08T10:00:00+01:00'));
    const v = await t.call('POST', '/acessos/validar', { filialId: g.talatona, membroId: e.member.id }, g.rececao.token);
    assert.equal(v.body.entra, false);
    assert.equal(v.body.motivo, 'Plano expirou há 10 dias.');
    t.clock.set(new Date('2026-10-30T09:00:00+01:00'));
  });
});
