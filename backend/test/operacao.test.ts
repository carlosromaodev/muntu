import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { DispatcherService } from '../src/messaging/dispatcher.service.js';
import { LogProvider, MESSAGE_PROVIDER } from '../src/messaging/providers.js';
import { RemindersService } from '../src/messaging/reminders.service.js';
import { enroll, enrollPaid, gym, key, setup, type Gym, type T } from './helpers.js';

const services = (t: T) => ({
  dispatcher: t.app.get(DispatcherService),
  reminders: t.app.get(RemindersService),
  provider: t.app.get<LogProvider>(MESSAGE_PROVIDER),
});

describe('Pendências e passagem de turno', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
  });
  after(() => t.close());

  it('cria, comenta, passa a outra pessoa e resolve, com histórico', async () => {
    const c = await t.call('POST', '/pendencias', { filialId: g.talatona, tipo: 'documento', titulo: 'Cópia do BI do Edson em falta' }, g.rececao.token);
    assert.equal(c.status, 201);
    assert.equal(c.body.ownerUserId, g.rececao.userId);
    assert.equal(c.body.number, 1);
    const n = await t.call('POST', `/pendencias/${c.body.id}/notas`, { nota: 'Liguei, traz amanhã.' }, g.rececao.token);
    assert.equal(n.status, 200);
    const out = await t.call('POST', `/pendencias/${c.body.id}/transferir`, { para: g.financas.userId }, g.rececao.token);
    assert.equal(out.status, 200);
    const notMine = await t.call('POST', `/pendencias/${c.body.id}/transferir`, { para: g.rececao2.userId }, g.rececao.token);
    assert.equal(notMine.status, 403, 'só o responsável ou o gerente passam a pendência');
    const res = await t.call('POST', `/pendencias/${c.body.id}/resolver`, { resolucao: 'BI digitalizado e arquivado.' }, g.financas.token);
    assert.equal(res.body.status, 'resolvida');
    const again = await t.call('POST', `/pendencias/${c.body.id}/resolver`, { resolucao: 'outra vez' }, g.financas.token);
    assert.equal(again.body.code, 'PENDENCIA_FECHADA');
    const full = await t.call('GET', `/pendencias/${c.body.id}`, undefined, g.gerente.token);
    assert.deepEqual(full.body.historico.map((h: any) => h.kind), ['criada', 'nota', 'transferida', 'resolvida']);
  });

  it('não atribui a quem não trabalha na filial', async () => {
    const r = await t.call('POST', '/pendencias', { filialId: g.kilamba, tipo: 'outro', titulo: 'Rever catraca' }, g.gerente.token);
    assert.equal(r.status, 403, 'o gerente só tem Talatona');
    const d = await t.call('POST', '/pendencias', { filialId: g.kilamba, tipo: 'outro', titulo: 'Rever catraca', responsavelId: g.rececao.userId }, g.dono);
    assert.equal(d.body.code, 'RESPONSAVEL_INVALIDO');
  });

  it('ocorrência da equipa entra nas pendências e sai quando é resolvida (RN-64)', async () => {
    const oc = await t.call('POST', '/ocorrencias', { filialId: g.talatona, tipo: 'Equipamento', zona: 'Cardio', equipamento: 'Passadeira 3', descricao: 'A passadeira 3 pára sozinha ao fim de 2 minutos.' }, g.rececao.token);
    assert.equal(oc.status, 201);
    const list = await t.call('GET', `/pendencias?filialId=${g.talatona}`, undefined, g.rececao.token);
    const task = list.body.find((x: any) => x.originId === oc.body.id);
    assert.ok(task, 'a ocorrência criou uma pendência');
    assert.equal(task.kind, 'ocorrencia');
    await t.call('PATCH', `/ocorrencias/${oc.body.id}/estado`, { estado: 'resolvida', nota: 'Técnico trocou o sensor.' }, g.gerente.token);
    const after = await t.call('GET', `/pendencias/${task.id}`, undefined, g.rececao.token);
    assert.equal(after.body.status, 'resolvida');
    assert.equal(after.body.resolution, 'Técnico trocou o sensor.');
  });

  it('na passagem de turno as pendências passam para quem recebe (RN-54) e o resumo mostra-as', async () => {
    const a = await t.call('POST', '/pendencias', { filialId: g.talatona, tipo: 'cobranca', titulo: 'Cobrar 15 000 Kz ao Bruno' }, g.rececao.token);
    const resumo = await t.call('GET', `/caixa/turnos/${g.shiftId}/resumo`, undefined, g.rececao2.token);
    assert.equal(resumo.status, 200);
    assert.ok(resumo.body.pendenciasAbertas.some((p: any) => p.id === a.body.id));
    assert.equal(resumo.body.esperadoDinheiroCentimos, undefined, 'a recepção não vê o esperado');
    const done = await t.call('POST', `/caixa/turnos/${g.shiftId}/receber`, { quantidades: { '5000': 4 }, senha: g.rececao2.password, decisao: 'ressalva' }, g.rececao2.token);
    assert.equal(done.body.fechado, true);
    assert.equal(done.body.pendenciasRecebidas, 1);
    const mine = await t.call('GET', '/pendencias?minhas=true', undefined, g.rececao2.token);
    const got = mine.body.find((x: any) => x.id === a.body.id);
    assert.equal(got.shiftsPassed, 1);
    const hist = await t.call('GET', `/pendencias/${a.body.id}`, undefined, g.rececao2.token);
    assert.equal(hist.body.historico.at(-1).kind, 'passou_turno');
  });

  it('outro ginásio não vê as pendências (RLS)', async () => {
    const other = await gym(t, 'Outro Ginásio');
    const mine = await t.call('GET', `/pendencias?filialId=${g.talatona}`, undefined, g.rececao2.token);
    const id = mine.body[0].id;
    const r = await t.call('GET', `/pendencias/${id}`, undefined, other.dono);
    assert.equal(r.status, 404);
  });
});

describe('Avisos à equipa e notificações', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
  });
  after(() => t.close());

  it('o gerente avisa a recepção; quem lê fica registado; finanças não recebe', async () => {
    const forbidden = await t.call('POST', '/avisos', { texto: 'Teste', para: ['todos'] }, g.rececao.token);
    assert.equal(forbidden.status, 403);
    const a = await t.call('POST', '/avisos', { texto: 'Catraca 2 em manutenção até às 12:00. Validar entradas à mão.', prioridade: 'urgente', para: ['rececao'], filialId: g.talatona }, g.gerente.token);
    assert.equal(a.status, 201);
    const unread = await t.call('GET', '/avisos?porLer=true', undefined, g.rececao.token);
    assert.equal(unread.body.length, 1);
    assert.equal(unread.body[0].priority, 'urgente');
    const fin = await t.call('GET', '/avisos', undefined, g.financas.token);
    assert.equal(fin.body.length, 0);
    await t.call('POST', `/avisos/${a.body.id}/lido`, undefined, g.rececao.token);
    const reads = await t.call('GET', `/avisos/${a.body.id}/leituras`, undefined, g.gerente.token);
    assert.equal(reads.body.total, 2, 'as duas recepcionistas de Talatona');
    assert.equal(reads.body.lidos, 1);
    const notYours = await t.call('GET', `/avisos/${a.body.id}/leituras`, undefined, g.rececao.token);
    assert.equal(notYours.status, 403);
  });

  it('o aviso chega como notificação na app depois do envio', async () => {
    const { dispatcher } = services(t);
    const r = await dispatcher.runOnce();
    assert.ok(r.enviadas >= 1);
    const n = await t.call('GET', '/notificacoes?porLer=true', undefined, g.rececao2.token);
    assert.equal(n.body.porLer, 1);
    assert.equal(n.body.notificacoes[0].title, 'Aviso urgente');
    assert.match(n.body.notificacoes[0].body, /Catraca 2/);
    await t.call('POST', '/notificacoes/lidas', undefined, g.rececao2.token);
    const after = await t.call('GET', '/notificacoes?porLer=true', undefined, g.rececao2.token);
    assert.equal(after.body.porLer, 0);
  });
});

describe('Mensagens a membros: envio, regras, repetição e lembretes', () => {
  let t: T;
  let g: Gym;
  before(async () => {
    t = await setup();
    g = await gym(t);
  });
  after(() => t.close());

  it('pagamento confirmado sai por SMS com a factura, uma só vez', async () => {
    const { dispatcher, provider } = services(t);
    const e = await enrollPaid(t, g);
    await dispatcher.runOnce();
    const sms = provider.sent.filter((m) => m.to === e.member.phone);
    assert.ok(sms.some((m) => /recebemos 30 000,00 Kz\. Factura FR /.test(m.body) && m.body.includes('Mwangolé Fit')), JSON.stringify(sms));
    const before = provider.sent.length;
    await dispatcher.runOnce();
    assert.equal(provider.sent.length, before, 'nada sai duas vezes');
    const log = await t.call('GET', `/mensagens/envios?membroId=${e.member.id}`, undefined, g.dono);
    assert.ok(log.body.envios.some((x: any) => x.template === 'pagamento.confirmado' && x.status === 'enviado'));
  });

  it('regra desligada pelo dono: a mensagem é cancelada; modelos validam as variáveis', async () => {
    const { dispatcher, provider } = services(t);
    const bad = await t.call('PUT', '/mensagens/regras/pagamento_confirmado', { modelo: 'Olá {apelido}' }, g.dono);
    assert.equal(bad.body.code, 'VARIAVEL_DESCONHECIDA');
    const notOwner = await t.call('PUT', '/mensagens/regras/pagamento_confirmado', { ligada: false }, g.gerente.token);
    assert.equal(notOwner.status, 403);
    const off = await t.call('PUT', '/mensagens/regras/pagamento_confirmado', { ligada: false }, g.dono);
    assert.equal(off.body.enabled, false);
    const e = await enrollPaid(t, g);
    await dispatcher.runOnce();
    assert.equal(provider.sent.filter((m) => m.to === e.member.phone && /recebemos/.test(m.body)).length, 0);
    const reset = await t.call('PUT', '/mensagens/regras/pagamento_confirmado', { repor: true }, g.dono);
    assert.equal(reset.body.enabled, true);
    const rules = await t.call('GET', '/mensagens/regras', undefined, g.gerente.token);
    assert.equal(rules.body.length, 8);
  });

  it('fornecedor em baixo: volta a tentar com espera e não repete quem já recebeu', async () => {
    const { dispatcher, provider } = services(t);
    const e = await enroll(t, g);
    provider.failing.add(e.member.phone);
    await t.call('POST', '/pagamentos', { filialId: g.talatona, membroId: e.member.id, subscricaoId: e.sub.id, meio: 'dinheiro', valorCentimos: e.sub.priceCents, chaveIdempotencia: key() }, g.rececao.token);
    const r1 = await dispatcher.runOnce();
    assert.ok(r1.falhadas >= 1);
    const q = await t.call('GET', '/mensagens/envios', undefined, g.dono);
    const waiting = q.body.porEnviar.find((o: any) => o.target === e.member.phone);
    assert.equal(waiting.attempts, 1);
    assert.match(waiting.lastError, /indisponível/);
    provider.failing.delete(e.member.phone);
    await dispatcher.runOnce();
    assert.equal(provider.sent.filter((m) => m.to === e.member.phone).length, 0, 'ainda não chegou a hora da nova tentativa');
    t.clock.set(new Date(t.clock.now().getTime() + 2 * 60_000));
    await dispatcher.runOnce();
    assert.equal(provider.sent.filter((m) => m.to === e.member.phone && /recebemos/.test(m.body)).length, 1);
  });

  it('lembretes: 3 dias antes do vencimento, à hora da regra, uma vez (RN-75)', async () => {
    const { dispatcher, reminders, provider } = services(t);
    const e = await enrollPaid(t, g);
    // Paga a 30 Out: plano de 30 dias vence a 28 Nov. Três dias antes: 25 Nov.
    t.clock.set(new Date('2026-11-25T08:00:00+01:00'));
    assert.equal(await reminders.runOnce(), 0, 'antes das 10:00 ainda não sai');
    t.clock.set(new Date('2026-11-25T10:30:00+01:00'));
    assert.ok((await reminders.runOnce()) >= 1);
    assert.equal(await reminders.runOnce() >= 1, true, 'volta a correr…');
    await dispatcher.runOnce();
    const sms = provider.sent.filter((m) => m.to === e.member.phone && /vence a 28\/11/.test(m.body));
    assert.equal(sms.length, 1, '…mas a chave única impede duplicados');
    t.clock.set(new Date('2026-12-01T10:30:00+01:00'));
    await reminders.runOnce();
    await dispatcher.runOnce();
    assert.ok(provider.sent.some((m) => m.to === e.member.phone && /venceu a 28\/11\. Regulariza até 05\/12/.test(m.body)), 'em atraso 3 dias depois');
  });

  it('envio manual a um segmento cria uma mensagem por membro', async () => {
    t.clock.set(new Date('2026-10-30T12:00:00+01:00'));
    const plan = await t.call('POST', '/mensagens/enviar', { segmento: 'plano', planoId: g.planId, texto: 'Olá {nome}, o ginásio fecha às 18:00 no feriado.' }, g.gerente.token);
    assert.equal(plan.status, 201);
    assert.ok(plan.body.pessoas >= 1);
    const { dispatcher, provider } = services(t);
    await dispatcher.runOnce();
    assert.ok(provider.sent.some((m) => /^Olá Kátia, o ginásio fecha às 18:00/.test(m.body)));
  });
});

describe('Painel do dono, financeiro, renovações e retenção', () => {
  let t: T;
  let g: Gym;
  let paid: Awaited<ReturnType<typeof enrollPaid>>;
  before(async () => {
    t = await setup();
    g = await gym(t);
    paid = await enrollPaid(t, g);
    await enroll(t, g); // inscrição por pagar
  });
  after(() => t.close());

  it('esperado vs. recebido com a diferença explicada linha a linha', async () => {
    const p = await t.call('GET', '/relatorios/painel', undefined, g.dono);
    assert.equal(p.status, 200);
    assert.equal(p.body.esperadoCentimos, 6_000_000);
    assert.equal(p.body.recebidoCentimos, 3_000_000);
    assert.equal(p.body.diferencaCentimos, 3_000_000);
    assert.equal(p.body.taxaCobranca, 50);
    assert.equal(p.body.membros.activos, 1);
    assert.equal(p.body.membros.novos, 2);
    assert.equal(p.body.recebidoPorMeio.dinheiro, 3_000_000);
    assert.equal(p.body.ocupacaoPorHora.length, 17);
    const d = await t.call('GET', '/relatorios/esperado-recebido', undefined, g.financas.token);
    assert.deepEqual(d.body.linhas.map((l: any) => l.tipo), ['por_pagar']);
    const rec = await t.call('GET', '/relatorios/painel', undefined, g.rececao.token);
    assert.equal(rec.status, 403);
  });

  it('resumo financeiro do dia e renovações próximas', async () => {
    const f = await t.call('GET', '/relatorios/financeiro', undefined, g.financas.token);
    assert.equal(f.body.entradasCentimos, 3_000_000);
    assert.equal(f.body.caixasAbertos.length, 1);
    assert.equal(f.body.devedores.quantidade, 0);
    const r7 = await t.call('GET', '/relatorios/renovacoes?dias=7', undefined, g.rececao.token);
    assert.equal(r7.body.quantidade, 0);
    const r30 = await t.call('GET', '/relatorios/renovacoes?dias=30', undefined, g.rececao.token);
    assert.equal(r30.body.quantidade, 1);
    assert.equal(r30.body.membros[0].diasRestantes, 29);
    // Um mês e meio depois: o membro deve e aparece nos devedores e no painel como renovação em falta.
    t.clock.set(new Date('2026-12-02T09:00:00+01:00'));
    const late = await t.call('GET', '/relatorios/financeiro', undefined, g.financas.token);
    assert.equal(late.body.devedores.quantidade, 1);
    assert.equal(late.body.devedores.lista[0].diasAtraso, 4);
    assert.equal(late.body.devedores.lista[0].estado, 'em_divida');
    const dec = await t.call('GET', '/relatorios/esperado-recebido?de=2026-11-01&ate=2026-12-02', undefined, g.dono);
    assert.ok(dec.body.linhas.some((l: any) => l.tipo === 'renovacao_em_falta' && l.membro === 'Kátia Muondo'));
  });

  it('membros em risco com motivo; contacto sem resposta cria pendência', async () => {
    const risk = await t.call('GET', '/retencao/risco', undefined, g.rececao.token);
    const m = risk.body.find((x: any) => x.membroId === paid.member.id);
    assert.ok(m, JSON.stringify(risk.body));
    assert.ok(m.sinais.some((s: any) => s.codigo === 'em_divida'));
    assert.ok(m.sinais.some((s: any) => s.codigo === 'sem_entradas'));
    const c = await t.call('POST', '/retencao/contactos', { membroId: paid.member.id, canal: 'telefone', resultado: 'sem_resposta' }, g.rececao.token);
    assert.ok(c.body.pendenciaId);
    const ok = await t.call('POST', '/retencao/contactos', { membroId: paid.member.id, canal: 'telefone', motivo: 'viagem', resultado: 'vai_renovar', nota: 'Volta de Benguela na segunda.' }, g.rececao.token);
    assert.equal(ok.status, 201);
    const task = await t.call('GET', `/pendencias/${c.body.pendenciaId}`, undefined, g.rececao.token);
    assert.equal(task.body.status, 'resolvida');
    const after = await t.call('GET', '/retencao/risco', undefined, g.rececao.token);
    assert.ok(!after.body.some((x: any) => x.membroId === paid.member.id), 'quem vai renovar sai da lista durante uma semana');
    const hist = await t.call('GET', `/retencao/contactos/${paid.member.id}`, undefined, g.gerente.token);
    assert.equal(hist.body.length, 2);
  });
});
