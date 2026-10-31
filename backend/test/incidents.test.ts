import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { gym, phone, setup, type Gym, type T } from './helpers.js';

describe('Ocorrências', () => {
  let t: T;
  let g: Gym;
  let member: string;
  before(async () => {
    t = await setup();
    g = await gym(t);
    const tel = phone();
    const m = await t.call('POST', '/membros', { nome: 'Joana Kiala', telefone: tel, filialId: g.talatona, consentimento: true, criarConta: true }, g.rececao.token);
    member = (await t.call('POST', '/auth/entrar', { telefone: tel, senha: m.body.tempPassword })).body.accessToken;
  });
  after(() => t.close());

  it('valida tipo, zona, equipamento e descrição (RN-61)', async () => {
    const r = await t.call('POST', '/ocorrencias', { filialId: g.talatona, tipo: 'Equipamento', zona: 'Cardio', descricao: 'Faz barulho estranho' }, member);
    assert.equal(r.body.code, 'EQUIPAMENTO_EM_FALTA');
    const short = await t.call('POST', '/ocorrencias', { filialId: g.talatona, tipo: 'Limpeza', zona: 'Cardio', descricao: 'sujo' }, member);
    assert.equal(short.body.code, 'DADOS_INVALIDOS');
  });

  it('membro com alguém magoado: urgente e numerada', async () => {
    const r = await t.call('POST', '/ocorrencias', { filialId: g.talatona, tipo: 'Lesão', zona: 'Balneários', descricao: 'Escorreguei no chão molhado perto dos cacifos.', magoado: true }, member);
    assert.equal(r.status, 201);
    assert.equal(r.body.code, 'OC-0001');
    assert.equal(r.body.urgency, 'alta');
    assert.match(r.body.mensagem, /urgente/);
  });

  it('a equipa vê, muda o estado e o membro acompanha', async () => {
    const list = await t.call('GET', '/ocorrencias', undefined, g.rececao.token);
    assert.equal(list.body.length, 1);
    const upd = await t.call('PATCH', `/ocorrencias/${list.body[0].id}/estado`, { estado: 'em_analise', nota: 'Chamada a limpeza' }, g.rececao.token);
    assert.equal(upd.body.status, 'em_analise');
    const mine = await t.call('GET', '/ocorrencias', undefined, member);
    assert.equal(mine.body[0].status, 'em_analise');
  });

  it('o membro não muda estados', async () => {
    const mine = await t.call('GET', '/ocorrencias', undefined, member);
    const r = await t.call('PATCH', `/ocorrencias/${mine.body[0].id}/estado`, { estado: 'resolvida' }, member);
    assert.equal(r.status, 403);
  });
});
