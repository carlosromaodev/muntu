/* Dados do desenho "MUNTU Mobile" (fonte: design/MUNTU Mobile.dc.html). */
import { Tone } from '../theme/tokens';

export type Role = 'membro' | 'rececao' | 'financas' | 'pt' | 'dono';

/** Estados com rótulo e tom (cores do desenho). */
export const ST = {
  pago: ['Entrou', 'ok'],
  divida: ['Bloqueado', 'bad'],
  visita: ['Visita rede', 'warn'],
  vencer: ['A vencer', 'warn'],
  congelado: ['Congelado', 'neutral'],
  aberto: ['Aberto', 'ok'],
  fechado: ['Fechado', 'neutral'],
  dif: ['Diferença', 'bad'],
  concl: ['Concluída', 'neutral'],
  entrou: ['Presente', 'ok'],
  aceite: ['Aceite', 'ok'],
  recusado: ['Recusado', 'bad'],
  urgente: ['Urgente', 'bad'],
  normal: ['Informação', 'neutral'],
  recusou: ['Não entrou', 'neutral'],
} as const satisfies Record<string, readonly [string, Tone]>;
export type StKey = keyof typeof ST;

export const ROLE_INFO: Record<Role, { label: string; name: string; filial: string; tel: string; initials: string }> = {
  rececao: { label: 'Recepção', name: 'Celma Bento', filial: 'Talatona', tel: '924 310 115', initials: 'CB' },
  financas: { label: 'Finanças', name: 'Jorge Afonso', filial: 'Rede', tel: '925 700 410', initials: 'JA' },
  pt: { label: 'Personal trainer', name: 'Nuno Sebastião', filial: 'Talatona', tel: '926 118 902', initials: 'NS' },
  dono: { label: 'Dono', name: 'Paulo Neto', filial: 'Rede', tel: '927 220 001', initials: 'PN' },
  membro: { label: 'Membro', name: 'Kátia Muondo', filial: 'Talatona', tel: '923 481 220', initials: 'KM' },
};

/** Prefixo do telemóvel → papel (como no protótipo de entrada). */
export const LOGIN_ROLE: Record<string, Role> = { '923': 'membro', '924': 'rececao', '925': 'financas', '926': 'pt', '927': 'dono' };

export const STAFF = [
  ['CB', 'Celma Bento', 'Recepção', 'Talatona', 1, '06:58', '38h', '98%', '412 entradas validadas', 0],
  ['TL', 'Teresa Lunda', 'Recepção', 'Talatona', 0, 'Entra 14:00', '36h', '94%', '371 entradas validadas', 0],
  ['RM', 'Rui Manuel', 'Recepção', 'Kilamba', 1, '07:04', '35h', '86%', '2 activações sem pagamento', 1],
  ['JA', 'Jorge Afonso', 'Finanças', 'Rede', 1, '08:30', '40h', '100%', '94% cobrado em Outubro', 0],
  ['NS', 'Nuno Sebastião', 'PT', 'Talatona', 1, '06:15', '42h', '97%', '46 sessões · 9 clientes', 0],
  ['LP', 'Leonor Paím', 'PT', 'Talatona', 1, '07:20', '30h', '92%', '31 sessões · 6 clientes', 0],
  ['HM', 'Hélio Matias', 'PT', 'Kilamba', 0, 'Entra 17:00', '28h', '89%', '27 sessões · 7 clientes', 0],
].map(([i, n, r, f, on, since, h, ass, k, w]) => ({ i: i as string, n: n as string, r: r as string, f: f as string, on: !!on, since: since as string, h: h as string, ass: ass as string, k: k as string, warn: !!w }));

/** Lotação por hora (06h → 22h); agora = índice 3 (09h). */
export const OCC = [22, 48, 64, 41, 28, 20, 24, 30, 26, 22, 30, 52, 78, 92, 70, 44, 18];
export const OCC_NOW = 3;
export const CAP = 120;
export const lotLevel = (n: number) => (n < 50 ? 'Tranquilo' : n < 85 ? 'Moderado' : 'Cheio');

export const WEEK_DAYS = ['Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter', 'Qua'];
export const WEEK_NUMS = [29, 30, 31, 1, 2, 3, 4];
export const CLASSES = [
  ['06:30', 'Funcional', 'Nuno Sebastião · Sala 1', 20],
  ['07:30', 'Spinning', 'Leonor Paím · Sala 2', 16],
  ['12:15', 'Treino de força', 'Nuno Sebastião · Sala 1', 12],
  ['18:00', 'Kizomba fit', 'Leonor Paím · Sala 2', 24],
  ['19:00', 'Cross training', 'Hélio Matias · Box', 14],
  ['20:00', 'Pilates', 'Ana Sousa · Sala 3', 10],
].map(([h, n, d, cap]) => ({ h: h as string, n: n as string, d: d as string, cap: cap as number }));

export const CHALLENGES = [
  { id: 'd1', t: 'Novembro sem falhas', d: '20 treinos em 30 dias. Conta pelo check-in.', prog: 6, goal: 20, unit: 'treinos', people: 142, end: '30 Nov', prize: 'Prémio: 1 mês grátis para os 3 primeiros.', auto: false },
  { id: 'd2', t: 'Desafio de força', d: 'Supino, agachamento e peso morto. Avaliado pelo teu PT.', prog: 0, goal: 3, unit: 'avaliações', people: 58, end: '15 Dez', prize: 'Medalha e destaque no ginásio.', auto: false },
  { id: 'd3', t: 'Talatona vs Kilamba', d: 'Filial com mais check-ins ganha. Participas pela tua filial.', prog: 1840, goal: 3000, unit: 'check-ins', people: 610, end: '15 Nov', prize: 'A filial vencedora ganha uma aula aberta com DJ.', auto: true },
];
export const EVENTS = [
  { id: 'e1', d: '9', m: 'Nov', w: 'Sáb · 07:00', t: 'Corrida da Marginal', l: 'Marginal de Luanda · 5 km', cap: 40, taken: 22 },
  { id: 'e2', d: '16', m: 'Nov', w: 'Sáb · 10:00', t: 'Workshop de nutrição', l: 'Talatona · Sala 3', cap: 12, taken: 9 },
  { id: 'e3', d: '23', m: 'Nov', w: 'Sáb · 09:00', t: 'Treino aberto · traz um amigo', l: 'Todas as filiais', cap: 0, taken: 0 },
];

export const TRAINERS = [
  { i: 'NS', n: 'Nuno Sebastião', e: 'Força e hipertrofia', price: 8000, on: true },
  { i: 'LP', n: 'Leonor Paím', e: 'Mobilidade e pilates', price: 7000, on: true },
  { i: 'HM', n: 'Hélio Matias', e: 'Cross training', price: 7500, on: false },
];
export const PT_DAYS = [['seg', 'Seg'], ['ter', 'Ter'], ['qua', 'Qua'], ['qui', 'Qui'], ['sex', 'Sex'], ['sab', 'Sáb']] as const;
export const PT_HOURS = ['06:30', '07:30', '12:00', '18:00', '19:00', '20:00'];

export const PAY_METHODS = [
  { v: 'express', l: 'Multicaixa Express', d: 'Confirma no telemóvel' },
  { v: 'ref', l: 'Referência Multicaixa', d: 'Paga no ATM ou no banco online' },
  { v: 'tpa', l: 'TPA na recepção', d: 'Paga ao entrar no ginásio' },
] as const;

export const CHECKINS = [
  { id: 'c1', h: '09:38', n: 'Ana Domingos', p: 'Rede · Mensal', k: 'pago' as StKey, v: 0 },
  { id: 'c2', h: '09:31', n: 'Edson Mateus', p: 'Local · Mensal', k: 'pago' as StKey, v: 0 },
  { id: 'c3', h: '09:24', n: 'Mário Sebastião', p: 'Local · Mensal · 12 dias em atraso', k: 'divida' as StKey, v: 30000 },
  { id: 'c4', h: '09:12', n: 'Joana Kiala', p: 'Híbrido · de Kilamba', k: 'pago' as StKey, v: 0 },
  { id: 'c5', h: '09:02', n: 'Bruno Kianda', p: 'Kianda Fitness · visita de rede', k: 'visita' as StKey, v: 0 },
];

export const MEMBERS = [
  { i: 'AD', n: 'Ana Domingos', d: '#4821 · Rede Mensal', k: 'pago' as StKey, dias: '18 dias' },
  { i: 'MS', n: 'Mário Sebastião', d: '#4511 · Local Mensal', k: 'divida' as StKey, dias: '12 dias em atraso' },
  { i: 'KM', n: 'Kátia Muondo', d: '#4822 · Rede Mensal', k: 'pago' as StKey, dias: '18 dias' },
  { i: 'JK', n: 'Joana Kiala', d: '#4602 · Híbrido', k: 'vencer' as StKey, dias: 'vence em 3 dias' },
  { i: 'EM', n: 'Edson Mateus', d: '#4790 · Local Mensal', k: 'pago' as StKey, dias: '24 dias' },
  { i: 'CL', n: 'Celso Lima', d: '#4700 · Local Mensal', k: 'congelado' as StKey, dias: 'até 15 Nov' },
];

/** Membros para cobrar/facturar: nome, nº · plano, telefone, estado, valor do plano. */
export const CHARGE_MEMBERS: Record<string, { n: string; d: string; tel: string; k: StKey; v: number }> = {
  AD: { n: 'Ana Domingos', d: '#4821 · Rede Mensal', tel: '923 118 402', k: 'pago', v: 45000 },
  MS: { n: 'Mário Sebastião', d: '#4511 · Local Mensal', tel: '924 776 310', k: 'divida', v: 30000 },
  KM: { n: 'Kátia Muondo', d: '#4822 · Rede Mensal', tel: '923 481 220', k: 'pago', v: 45000 },
  JK: { n: 'Joana Kiala', d: '#4602 · Híbrido', tel: '925 902 118', k: 'vencer', v: 38000 },
  EM: { n: 'Edson Mateus', d: '#4790 · Local Mensal', tel: '923 554 017', k: 'pago', v: 30000 },
};

export const PLANS = [
  { v: 'local', l: 'Local Mensal', d: 'Só a filial Talatona', p: 30000 },
  { v: 'rede', l: 'Rede Mensal', d: 'Todas as filiais e rede MUNTU', p: 45000 },
  { v: 'hibrido', l: 'Híbrido', d: 'Talatona e Kilamba', p: 38000 },
] as const;
export const PAY_MEANS = ['TPA', 'Dinheiro', 'Express', 'Referência'] as const;

export const INCOME_TODAY = [
  ['Dinheiro', 88000],
  ['Multicaixa Express', 64500],
  ['TPA', 22000],
  ['Transferência', 10000],
] as const;
export const CASH_DESKS = [
  { n: 'Talatona · Manhã', d: 'Celma Bento · desde 07:00', v: 88000, k: 'aberto' as StKey },
  { n: 'Kilamba · Manhã', d: 'Rui Manuel · desde 07:00', v: 54000, k: 'aberto' as StKey },
  { n: 'Maianga · Ontem', d: 'Fecho às 22:04 · −2 000 Kz', v: 164500, k: 'dif' as StKey },
];
export const DEBTORS = [
  { n: 'Mário Sebastião', d: 'Local Mensal · 12 dias', v: 30000 },
  { n: 'Celso Pedro', d: 'Rede Mensal · 9 dias', v: 45000 },
  { n: 'Luísa Tomás', d: 'Híbrido · 21 dias', v: 38000 },
  { n: 'Paulo Jorge', d: 'Local Mensal · 33 dias', v: 30000 },
];

export const PT_AGENDA = [
  { id: 'a1', h: '06:30', n: 'Kátia Muondo', d: 'Força · sessão 5 de 8', k: 'concl' },
  { id: 'a2', h: '07:30', n: 'Edson Mateus', d: 'Hipertrofia · sessão 2 de 12', k: 'concl' },
  { id: 'a3', h: '12:15', n: 'Joana Kiala', d: 'Força · sessão 7 de 8', k: 'agend' },
  { id: 'a4', h: '18:00', n: 'Mário Sebastião', d: 'Avaliação inicial', k: 'agend' },
  { id: 'a5', h: '19:00', n: 'Ana Domingos', d: 'Força · sessão 1 de 8', k: 'agend' },
];
export const PT_REQUESTS = [
  { id: 'q1', i: 'KM', n: 'Kátia Muondo', plan: 'Rede Mensal · cliente nova', dias: '2× por semana · Ter e Qui', hora: '18:00 · a partir de 4 Nov', v: 64000 },
  { id: 'q2', i: 'BK', n: 'Bruno Kianda', plan: 'Kianda Fitness · rede', dias: '3× por semana · Seg, Qua e Sex', hora: '07:30 · a partir de 3 Nov', v: 96000 },
  { id: 'q3', i: 'SL', n: 'Sara Lopes', plan: 'Local Mensal', dias: '1× por semana · Sáb', hora: '09:00 · a partir de 8 Nov', v: 32000 },
];

export const NOTICES = [
  { id: 'n1', p: 'urgente' as 'urgente' | 'normal', t: 'Catraca 2 da Talatona em manutenção até às 12:00. Validar entradas manualmente na app.', de: 'Paulo Neto', h: 'Hoje · 07:10', to: 'Recepção', r: 4, n: 4 },
  { id: 'n2', p: 'normal' as 'urgente' | 'normal', t: 'O novo preço do Rede Mensal entra em vigor a 1 Dez. Os membros já foram avisados por SMS.', de: 'Paulo Neto', h: 'Ontem · 18:40', to: 'Todos', r: 6, n: 9 },
  { id: 'n3', p: 'normal' as 'urgente' | 'normal', t: 'Reunião de equipa no sábado às 15:00, sala 3.', de: 'Jorge Afonso', h: 'Seg · 09:00', to: 'Todos', r: 9, n: 9 },
];
export const NOTICE_TARGETS = { Todos: 9, Recepção: 3, Finanças: 1, PT: 3 } as const;
export const SHIFT_WEEK = [['Seg', 8.1], ['Ter', 7.9], ['Qua', 8.2], ['Qui', 5.2], ['Sex', 0], ['Sáb', 0], ['Dom', 0]] as const;

export type ActivityKind = 'aula' | 'desafio' | 'evento';
export type ActivityState = 'pendente' | 'aprovado' | 'publicado' | 'recusado';
export type Activity = { id: string; tipo: ActivityKind; t: string; when: string; meta: string; by: string; st: ActivityState };
export const ACTIVITIES: Activity[] = [
  { id: 'a1', tipo: 'desafio', t: '30 dias de mobilidade', when: '4 Nov – 4 Dez · Talatona', meta: 'Meta 20 sessões', by: 'Leonor Paím', st: 'pendente' },
  { id: 'a2', tipo: 'aula', t: 'Funcional ao ar livre', when: 'Sábados · 07:00 · Talatona', meta: '20 vagas', by: 'Nuno Sebastião', st: 'pendente' },
  { id: 'a3', tipo: 'desafio', t: 'Desafio de força', when: 'Até 15 Dez · Todas as filiais', meta: 'Meta 3 avaliações', by: 'Nuno Sebastião', st: 'aprovado' },
  { id: 'a4', tipo: 'desafio', t: 'Novembro sem falhas', when: '1–30 Nov · Todas as filiais', meta: 'Meta 20 treinos', by: 'Paulo Neto', st: 'publicado' },
  { id: 'a5', tipo: 'evento', t: 'Corrida da Marginal', when: 'Sáb 9 Nov · 07:00 · Marginal', meta: '40 vagas', by: 'Paulo Neto', st: 'publicado' },
  { id: 'a6', tipo: 'aula', t: 'Kettlebell iniciação', when: 'Quintas · 19:00 · Kilamba', meta: '12 vagas', by: 'Nuno Sebastião', st: 'recusado' },
];
export const ACT_STATE: Record<ActivityState, [string, Tone]> = {
  pendente: ['A aguardar aprovação', 'warn'],
  aprovado: ['Publicado', 'ok'],
  publicado: ['Publicado', 'ok'],
  recusado: ['Recusado', 'bad'],
};
export const ACT_KIND: Record<ActivityKind, string> = { aula: 'Aula', desafio: 'Desafio', evento: 'Evento' };

export const RISK = [
  { id: 'k1', n: 'Edson Mateus', plan: 'Local Mensal', days: 12, freq: 'frequência −60%', resp: 'Celma Bento', by: 'rececao' },
  { id: 'k2', n: 'Joana Kiala', plan: 'Híbrido', days: 9, freq: 'frequência −45%', resp: 'Nuno Sebastião', by: 'pt' },
  { id: 'k3', n: 'Bruno Lopes', plan: 'Rede Mensal', days: 16, freq: 'frequência −80%', resp: 'Celma Bento', by: 'rececao' },
  { id: 'k4', n: 'Sara Domingos', plan: 'Local Mensal', days: 23, freq: 'sem entradas', resp: 'Teresa Lunda', by: 'rececao' },
  { id: 'k5', n: 'Hélder Pinto', plan: 'Rede Mensal', days: 31, freq: 'sem entradas', resp: 'Leonor Paím', by: 'pt' },
  { id: 'k6', n: 'Marta Neto', plan: 'Local Mensal', days: 8, freq: 'frequência −50%', resp: 'Nuno Sebastião', by: 'pt' },
];
export const RENEWALS = [
  { id: 'n1', n: 'Ana Domingos', plan: 'Rede Mensal', days: 3, v: 45000, hist: 'Sem atrasos', late: false },
  { id: 'n2', n: 'Joana Kiala', plan: 'Híbrido', days: 3, v: 38000, hist: '1 atraso em 6 meses', late: false },
  { id: 'n3', n: 'Celso Pedro', plan: 'Rede Mensal', days: 6, v: 45000, hist: '3 atrasos em 6 meses', late: true },
  { id: 'n4', n: 'Luísa Tomás', plan: 'Híbrido', days: 11, v: 38000, hist: 'Sem atrasos', late: false },
  { id: 'n5', n: 'Paulo Jorge', plan: 'Local Mensal', days: 14, v: 30000, hist: '2 atrasos em 6 meses', late: true },
];
export const RISK_REASONS = ['Viagem', 'Lesão', 'Insatisfação', 'Falta de tempo', 'Outro'];
export const RISK_RESULTS = ['Sem resposta', 'Vai voltar', 'Voltou', 'Cancelou'];
export const RENEW_REASONS = ['Preço', 'Mudou de zona', 'Falta de tempo', 'Insatisfação', 'Outro'];
export const RENEW_RESULTS = ['Renovou', 'Vai renovar', 'Não renova', 'Sem resposta'];
export const GOOD_RESULTS = new Set(['Voltou', 'Vai voltar', 'Renovou', 'Vai renovar']);

export const LOST = [
  { id: 'l1', cat: 'Desconto', t: 'Desconto de 25% acima do limite de 10%', v: 14000, o: 'Talatona · inscrição #4822', r: 'Celma Bento', st: 'pot', a: 'Pedir justificação' },
  { id: 'l2', cat: 'Pagamento', t: '30 000 Kz recebidos sem inscrição associada', v: 30000, o: 'Kilamba · TPA 09:14', r: 'Rui Manuel', st: 'pot', a: 'Associar a membro' },
  { id: 'l3', cat: 'Estorno', t: 'Estorno sem documento de suporte', v: 30000, o: 'Talatona · NC 0031', r: 'Celma Bento', st: 'pot', a: 'Pedir documento' },
  { id: 'l4', cat: 'Sessões PT', t: '3 sessões dadas sem pacote cobrado', v: 24000, o: 'Talatona', r: 'Nuno Sebastião', st: 'pot', a: 'Cobrar ao membro' },
  { id: 'l5', cat: 'Acesso', t: 'O mesmo QR usado 3 vezes em 10 minutos', v: 0, o: 'Talatona · catraca 1', r: '—', st: 'pot', a: 'Rever entradas' },
  { id: 'l6', cat: 'Mensalidades', t: '14 mensalidades vencidas há mais de 30 dias', v: 135000, o: 'Rede', r: 'Jorge Afonso', st: 'conf', a: 'Enviar cobrança' },
  { id: 'l7', cat: 'Caixa', t: 'Diferença de caixa por justificar', v: 8000, o: 'Kilamba · tarde 27/10', r: 'Rui Manuel', st: 'conf', a: 'Pedir justificação' },
  { id: 'l8', cat: 'Desconto', t: 'Desconto de 15% sem aprovação', v: 6000, o: 'Maianga · 21/10', r: 'Teresa Lunda', st: 'res', a: '' },
] as { id: string; cat: string; t: string; v: number; o: string; r: string; st: 'pot' | 'conf' | 'res'; a: string }[];

export const INCLUDED = [
  { l: 'Sessões de PT', v: '5 de 8', d: '3 por usar · expiram a 13 Nov', w: 0.62, c: '#1d1c1a', dc: '#6b675f', a: 'Marcar', go: 'pt' },
  { l: 'Reposição de sessão', v: '1 por repor', d: 'Cancelada pelo treinador a 22 Out', w: 0, c: '#c8640c', dc: '#b42318', a: 'Marcar', go: 'pt' },
  { l: 'Avaliação física', v: '0 de 1', d: 'Incluída no plano · ainda por marcar', w: 0, c: '#1d1c1a', dc: '#6b675f', a: 'Marcar', go: 'aulas' },
  { l: 'Aulas de grupo', v: 'Ilimitadas', d: '6 este mês', w: 1, c: '#d9d4c4', dc: '#6b675f', a: '', go: '' },
];
export const PAYMENTS = [
  { t: 'Outubro', d: '13 Out · Express', v: '45 000,00' },
  { t: 'Setembro', d: '13 Set · Express', v: '45 000,00' },
  { t: 'Agosto', d: '13 Ago · Dinheiro', v: '45 000,00' },
];

export const BRANCHES = [
  { n: 'Talatona', e: 1240000, r: 1196000, a: 612, o: '71%', ch: 184, al: '' },
  { n: 'Kilamba', e: 780000, r: 712000, a: 428, o: '64%', ch: 121, al: '2 alertas' },
  { n: 'Maianga', e: 430000, r: 394000, a: 244, o: '58%', ch: 76, al: '' },
];
export const COMPARE: Record<string, { l: string; rows: [string, number][]; unit: '%' | 'kz'; note: string }> = {
  ret: { l: 'Retenção', rows: [['Talatona', 82], ['Kilamba', 74], ['Maianga', 69]], unit: '%', note: 'Membros activos a 1 Ago que continuam activos.' },
  rec: { l: 'Receita', rows: [['Talatona', 3588000], ['Kilamba', 2136000], ['Maianga', 1182000]], unit: 'kz', note: 'Recebido, não facturado.' },
  cus: { l: 'Custos', rows: [['Talatona', 1420000], ['Kilamba', 980000], ['Maianga', 610000]], unit: 'kz', note: 'Salários, renda, manutenção e SMS.' },
  ocu: { l: 'Ocupação', rows: [['Talatona', 71], ['Kilamba', 64], ['Maianga', 58]], unit: '%', note: 'Média nas horas de abertura, por check-in.' },
  pt: { l: 'PT', rows: [['Talatona', 78], ['Kilamba', 61], ['Maianga', 40]], unit: '%', note: 'Horas de PT ocupadas sobre as disponíveis.' },
};
export const LEAKS = [
  { t: '2 subscrições activadas sem pagamento', d: 'Kilamba · hoje 09:14' },
  { t: 'Membro gratuito com 14 check-ins', d: 'Talatona · ontem' },
  { t: 'Caixa movimentado às 23:12', d: 'Maianga · sábado' },
];
export const APPROVALS = [
  { id: 'p1', k: 'Estorno · Talatona · 08:40', t: 'Edson Mateus · cobrança duplicada no TPA. Pedido por Celma Bento.', v: -30000 },
  { id: 'p2', k: 'Fecho de caixa · Kilamba', t: 'Diferença no turno da tarde. Justificação: troco dado a mais.', v: -8000 },
  { id: 'p3', k: 'Preço · Rede Mensal', t: 'De 45 000 para 50 000 Kz. Os 286 membros recebem SMS 30 dias antes.', v: 50000 },
];
export const DOCUMENTS = [
  { n: 'Contrato de arrendamento', cat: 'Contratos', f: 'Talatona', dt: 'Jan 2024', keep: 'Conservar até 2034', perm: 'Dono', ext: 'PDF', al: false },
  { n: 'Licença de actividade', cat: 'Licenças', f: 'Kilamba', dt: 'Nov 2025', keep: 'Expira em 21 dias · renovar', perm: 'Dono · Finanças', ext: 'PDF', al: true },
  { n: 'Factura · manutenção passadeiras', cat: 'Manutenção', f: 'Talatona', dt: '12 Out', keep: 'Conservar até 2036', perm: 'Dono · Finanças', ext: 'PDF', al: false },
  { n: 'Comprovativo · renda Outubro', cat: 'Comprovativos', f: 'Maianga', dt: '01 Out', keep: 'Conservar até 2036', perm: 'Finanças', ext: 'JPG', al: false },
  { n: 'Contrato · Nuno Sebastião', cat: 'Contratos', f: 'Rede', dt: 'Mar 2025', keep: 'Enquanto activo + 5 anos', perm: 'Dono', ext: 'PDF', al: false },
  { n: 'Seguro de responsabilidade', cat: 'Licenças', f: 'Rede', dt: 'Fev 2026', keep: 'Válido até Fev 2027', perm: 'Dono', ext: 'PDF', al: false },
];
export const REFERRALS_MINE = [
  { n: 'Sara Domingos', d: 'Inscrita a 3 Set · 2 de 2 mensalidades pagas', p: 2, k: 'libertada' },
  { n: 'Bruno Lopes', d: 'Inscrito a 12 Out · 1 de 2 mensalidades pagas', p: 1, k: 'pendente' },
  { n: 'Hélder Pinto', d: 'Convite enviado a 20 Out · ainda não se inscreveu', p: 0, k: 'convite' },
];
export const REFERRAL_STATE: Record<string, [string, Tone]> = { libertada: ['Recompensa libertada', 'ok'], pendente: ['A aguardar pagamento', 'warn'], convite: ['Convite enviado', 'neutral'] };
export const REFERRAL_REVIEW = [
  { id: 'v1', t: 'Bruno Lopes indicado por Kátia Muondo', why: 'Mesmo NIF que um ex-membro de Abril' },
  { id: 'v2', t: 'Sara Lopes indicada por Edson Mateus', why: 'Mesmo telefone que o indicador' },
];
export const REWARDS = { mes: '1 mês grátis', meio: '50% na mensalidade', kz: '10 000 Kz de crédito' } as const;

/** Receber turno (recepção, turno da tarde). */
export const DENOMS = [
  { k: 'n5000', l: 'Notas de 5 000', v: 5000 },
  { k: 'n2000', l: 'Notas de 2 000', v: 2000 },
  { k: 'n1000', l: 'Notas de 1 000', v: 1000 },
  { k: 'n500', l: 'Notas de 500', v: 500 },
  { k: 'n200', l: 'Notas de 200', v: 200 },
];
export const SHIFT_EXPECTED_CASH = 85000;
export const SHIFT_PAYS = [
  { k: 'tpa', l: 'TPA', d: 'Fecho do terminal às 14:00 · 6 operações', v: 22000, src: 'Mensalidades 15 000 · Bar 4 500 · PT 2 500', proof: 'fecho do terminal' },
  { k: 'exp', l: 'Multicaixa Express', d: '14 confirmações no extracto', v: 64500, src: 'Mensalidades 52 000 · Inscrições 9 000 · Bar 3 500', proof: 'extracto' },
  { k: 'ref', l: 'Referências Multicaixa', d: '2 pagamentos', v: 10000, src: 'Mensalidades 10 000', proof: 'extracto' },
  { k: 'pen', l: 'Por confirmar', d: '1 transferência · não entra na caixa', v: 15000, src: 'Transferência de Délcio Ngola', proof: 'comprovativo' },
];
export const SHIFT_PENDING = [
  { id: 'q1', k: 'cob', t: 'Cobrança · Mário Sebastião', d: '30 000 Kz · 12 dias em atraso' },
  { id: 'q2', k: 'doc', t: 'Factura por emitir', d: 'Bar · venda #1094 · 3 500 Kz' },
  { id: 'q3', k: 'rec', t: 'Reclamação · ar condicionado da sala 2', d: 'Ana Domingos · aguarda resposta' },
  { id: 'q4', k: 'res', t: 'Reserva PT · Kátia Muondo 18:00', d: 'Confirmar com Nuno Sebastião' },
  { id: 'q5', k: 'oco', t: 'Catraca 2 em manutenção', d: 'Técnico chega às 15:00' },
];
export const PENDING_KIND: Record<string, [string, Tone]> = { cob: ['Cobrança', 'warn'], doc: ['Documento', 'neutral'], rec: ['Reclamação', 'bad'], res: ['Reserva', 'neutral'], oco: ['Ocorrência', 'bad'] };

/** Membros com check-in feito agora (lotação). `pt` = sessão com treinador. */
export const PRESENT: { n: string; pl: string; h: string; z: string; pt?: string }[] = [
  { n: 'Kátia Muondo', pl: 'Rede Mensal', h: '09:38', z: 'Musculação', pt: 'PT Nuno' },
  { n: 'Délcio Ngola', pl: 'Rede Mensal', h: '09:31', z: 'Cardio' },
  { n: 'Ana Domingos', pl: 'Rede Mensal', h: '09:22', z: 'Aula · Funcional' },
  { n: 'Edson Mateus', pl: 'Local Mensal', h: '09:15', z: 'Musculação' },
  { n: 'Luísa Tomás', pl: 'Híbrido', h: '09:12', z: 'Aula · Funcional' },
  { n: 'Paulo Jorge', pl: 'Local Mensal', h: '09:04', z: 'Cardio' },
  { n: 'Joana Kiala', pl: 'Híbrido', h: '08:57', z: 'Musculação', pt: 'PT Leonor' },
  { n: 'Celso Pedro', pl: 'Rede · visita Kilamba', h: '08:49', z: 'Musculação' },
  { n: 'Marta Neto', pl: 'Local Mensal', h: '08:41', z: 'Aula · Funcional' },
  { n: 'Sara Domingos', pl: 'Local Mensal', h: '08:33', z: 'Cardio' },
  { n: 'Hélder Pinto', pl: 'Rede Mensal', h: '08:20', z: 'Musculação' },
  { n: 'Rosa Kiala', pl: 'Diário', h: '08:12', z: 'Cardio' },
];

/** Ocorrências: tipos, zonas e as que já existem (membro / equipa). */
export const INCIDENT_TYPES = {
  m: ['Equipamento', 'Limpeza', 'Segurança', 'Atendimento', 'Lesão', 'Outro'],
  s: ['Equipamento', 'Instalações', 'Segurança', 'Membro', 'Acidente', 'Sistema', 'Outro'],
} as const;
export const INCIDENT_ZONES = ['Musculação', 'Cardio', 'Sala de aulas', 'Balneários', 'Recepção', 'Entrada e parque'];
export const INCIDENT_STEPS = ['Recebida', 'Em análise', 'Resolvida'];
export const INCIDENTS_SEED: { m: [string, string, string, number][]; s: [string, string, string, number][] } = {
  m: [
    ['OC-0131', 'Passadeira 4 parada', 'Cardio · há 3 dias', 2],
    ['OC-0118', 'Balneário sem água quente', 'Balneários · 12 Out', 3],
  ],
  s: [
    ['OC-0139', 'Catraca 2 em manutenção', 'Entrada · hoje 08:10', 1],
    ['OC-0127', 'Membro escorregou no balneário', 'Balneários · 18 Out', 3],
  ],
};

/** Cores de destaque sugeridas para a marca do ginásio. */
export const BRAND_SWATCHES: [string, string][] = [
  ['#c8640c', 'Padrão MUNTU'],
  ['#1f5f8b', 'Atlântico'],
  ['#2e7d4f', 'Mata'],
  ['#8b1e3f', 'Bordô'],
  ['#5b3f8c', 'Ametista'],
  ['#1d1c1a', 'Grafite'],
];
