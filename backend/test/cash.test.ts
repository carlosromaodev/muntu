import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { enrollPaid, gym, setup, type Gym, type T } from './helpers.js';

// Fundo 20 000 Kz + uma mensalidade de 30 000 Kz em dinheiro = 50 000 Kz esperados.
const EXACT = { quantidades: { '5000': 10 }, avulsoCentimos: 0 };

describe('Caixa: fecho cego e passagem de turno', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
    await enrollPaid(t, g);
  });
  after(() => t.close());

  it('não abre um segundo caixa na mesma filial', async () => {
    const r = await t.call('POST', '/caixa/turnos', { filialId: g.talatona, turno: 'manha', fundoCentimos: 0 }, g.rececao2.token);
    assert.equal(r.status, 409);
    assert.equal(r.body.code, 'CAIXA_JA_ABERTO');
  });

  it('a recepção não vê o valor esperado do caixa (fecho cego); finanças vê', async () => {
    const r = await t.call('GET', `/caixa/turnos/actual?filialId=${g.talatona}`, undefined, g.rececao.token);
    assert.equal(r.body.expectedCashCents, undefined);
    const f = await t.call('GET', `/caixa/turnos/actual?filialId=${g.talatona}`, undefined, g.financas.token);
    assert.equal(f.body.expectedCashCents, 5_000_000);
  });

  it('despesa da recepção acima de 5 000 Kz precisa de comprovativo e vai a aprovação', async () => {
    const noReceipt = await t.call('POST', `/caixa/turnos/${g.shiftId}/movimentos`, { tipo: 'despesa', valorCentimos: 800_000, motivo: 'Produtos de limpeza' }, g.rececao.token);
    assert.equal(noReceipt.body.code, 'COMPROVATIVO_EM_FALTA');
    const r = await t.call('POST', `/caixa/turnos/${g.shiftId}/movimentos`, { tipo: 'despesa', valorCentimos: 800_000, motivo: 'Produtos de limpeza', comprovativoUrl: 'https://exemplo.ao/recibo.jpg' }, g.rececao.token);
    assert.equal(r.body.registado, false);
    assert.equal(r.body.aprovacao.requiredRole, 'financas');
    const rej = await t.call('POST', `/aprovacoes/${r.body.aprovacao.id}/decisao`, { aprovar: false, senha: g.financas.password, motivo: 'Comprar pelo fornecedor' }, g.financas.token);
    assert.equal(rej.body.status, 'recusado');
  });

  it('recebe o turno: diferença revelada só depois de contar, exige justificação e não altera o turno anterior', async () => {
    const first = await t.call('POST', `/caixa/turnos/${g.shiftId}/receber`, { quantidades: { '5000': 9 }, avulsoCentimos: 0 }, g.rececao2.token);
    assert.equal(first.status, 200);
    assert.equal(first.body.precisaDecisao, true);
    assert.equal(first.body.diferencaCentimos, -500_000);
    const noJust = await t.call('POST', `/caixa/turnos/${g.shiftId}/receber`, { quantidades: { '5000': 9 }, decisao: 'ressalva', senha: g.rececao2.password }, g.rececao2.token);
    assert.equal(noJust.body.code, 'JUSTIFICACAO_EM_FALTA');
    const wrongPw = await t.call('POST', `/caixa/turnos/${g.shiftId}/receber`, { quantidades: { '5000': 9 }, decisao: 'ressalva', justificacao: 'Recontado duas vezes', senha: 'errada' }, g.rececao2.token);
    assert.equal(wrongPw.body.code, 'CONFIRMACAO_FALHOU');
    const done = await t.call('POST', `/caixa/turnos/${g.shiftId}/receber`, { quantidades: { '5000': 9 }, decisao: 'ressalva', justificacao: 'Recontado duas vezes. Falta uma nota de 5 000.', senha: g.rececao2.password, turno: 'tarde' }, g.rececao2.token);
    assert.equal(done.body.fechado, true);
    assert.equal(done.body.decisao, 'ressalva');
    assert.equal(done.body.novoTurno.openingFloatCents, 4_500_000, 'o turno novo começa com o dinheiro contado');
    const hist = await t.call('GET', `/caixa/turnos?filialId=${g.talatona}`, undefined, g.financas.token);
    const old = hist.body.find((s: any) => s.id === g.shiftId);
    assert.equal(old.status, 'fechado');
    assert.equal(old.contagem.differenceCents, -500_000);
  });

  it('fecha às cegas sem diferença; não se cobra com o caixa fechado', async () => {
    const cur = await t.call('GET', `/caixa/turnos/actual?filialId=${g.talatona}`, undefined, g.rececao2.token);
    const close = await t.call('POST', `/caixa/turnos/${cur.body.id}/fecho`, { quantidades: { '5000': 9 } }, g.rececao2.token);
    assert.equal(close.body.fechado, true);
    assert.equal(close.body.decisao, 'sem_diferenca');
    const e = await t.call('POST', '/membros', { nome: 'Edson Mateus', telefone: '939111222', filialId: g.talatona, consentimento: true }, g.rececao.token);
    const s = await t.call('POST', `/membros/${e.body.id}/subscricoes`, { planoId: g.planId }, g.rececao.token);
    const p = await t.call('POST', '/pagamentos', { filialId: g.talatona, subscricaoId: s.body.id, meio: 'dinheiro', valorCentimos: 3_000_000, chaveIdempotencia: 'caixa-fechado-1' }, g.rececao.token);
    assert.equal(p.status, 409);
    assert.equal(p.body.code, 'CAIXA_FECHADO');
    void EXACT;
  });
});
