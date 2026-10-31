import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { gym, phone, setup, type Gym, type T } from './helpers.js';

describe('Autenticação e sessão', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
  });
  after(() => t.close());

  it('cria o ginásio com filiais e entra como dono', async () => {
    const me = await t.call('GET', '/auth/eu', undefined, g.dono);
    assert.equal(me.status, 200);
    assert.deepEqual(me.body.roles, ['dono']);
    assert.equal(me.body.branchIds, null);
  });

  it('recusa o mesmo telefone num segundo registo', async () => {
    const r = await t.call('POST', '/auth/registar-ginasio', { dono: { nome: 'Outro', telefone: g.donoPhone, senha: 'segredo1' }, ginasio: { nome: 'Ginásio X', filiais: ['Viana'] } });
    assert.equal(r.status, 409);
    assert.equal(r.body.code, 'TELEFONE_JA_REGISTADO');
  });

  it('mesma mensagem para número inexistente e senha errada', async () => {
    const a = await t.call('POST', '/auth/entrar', { telefone: g.donoPhone, senha: 'errada' });
    const b = await t.call('POST', '/auth/entrar', { telefone: phone(), senha: 'qualquer' });
    assert.equal(a.status, 401);
    assert.equal(b.status, 401);
    assert.equal(a.body.message, b.body.message);
  });

  it('valida o número angolano com mensagem em português', async () => {
    const r = await t.call('POST', '/auth/entrar', { telefone: '12345', senha: 'x' });
    assert.equal(r.status, 400);
    assert.equal(r.body.code, 'DADOS_INVALIDOS');
    assert.match(r.body.details.campos[0].problema, /9 dígitos/);
  });

  it('sem token, a API responde 401', async () => {
    const r = await t.call('GET', '/membros');
    assert.equal(r.status, 401);
    assert.equal(r.body.code, 'SESSAO_INVALIDA');
  });

  it('roda o token de renovação e revoga a família se um token usado voltar', async () => {
    const login = await t.call('POST', '/auth/entrar', { telefone: g.donoPhone, senha: 'segredo1' });
    const r1 = login.body.refreshToken;
    const ren = await t.call('POST', '/auth/renovar', { refreshToken: r1 });
    assert.equal(ren.status, 200);
    const r2 = ren.body.refreshToken;
    assert.notEqual(r1, r2);
    const reuse = await t.call('POST', '/auth/renovar', { refreshToken: r1 });
    assert.equal(reuse.status, 401);
    const after = await t.call('POST', '/auth/renovar', { refreshToken: r2 });
    assert.equal(after.status, 401, 'o token novo também fica revogado');
  });

  it('a recepção não convida equipa (só gerente ou dono)', async () => {
    const r = await t.call('POST', '/equipa', { nome: 'Alguém', telefone: phone(), perfil: 'rececao' }, g.rececao.token);
    assert.equal(r.status, 403);
  });
});
