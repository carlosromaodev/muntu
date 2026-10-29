// Dados de exemplo — substituir pela API.
// Valores em kwanzas (número). A formatação fica em lib/format.

export type StatusKey =
  | 'pago' | 'ok' | 'ativo' | 'entregue' | 'aprovado' | 'recebido' | 'feito'
  | 'vencer' | 'pendente' | 'convite' | 'agendado' | 'aguarda' | 'emcurso'
  | 'divida' | 'bloq' | 'retro' | 'suspenso' | 'falhou' | 'recusado' | 'divergencia' | 'risco'
  | 'congelado' | 'rede';

export type Tone = 'ok' | 'warn' | 'bad' | 'neutral' | 'ink';

export const ST: Record<StatusKey, { l: string; tone: Tone }> = {
  pago: { l: 'Pago', tone: 'ok' },
  ok: { l: 'Confirmado', tone: 'ok' },
  ativo: { l: 'Activo', tone: 'ok' },
  entregue: { l: 'Entregue', tone: 'ok' },
  aprovado: { l: 'Aprovado', tone: 'ok' },
  recebido: { l: 'Recebido', tone: 'ok' },
  feito: { l: 'Resolvido', tone: 'ok' },
  vencer: { l: 'A vencer', tone: 'warn' },
  pendente: { l: 'Estorno pendente', tone: 'warn' },
  convite: { l: 'Convite pendente', tone: 'warn' },
  agendado: { l: 'Agendado', tone: 'warn' },
  aguarda: { l: 'A aguardar', tone: 'warn' },
  emcurso: { l: 'Em curso', tone: 'warn' },
  divida: { l: 'Em dívida', tone: 'bad' },
  bloq: { l: 'Bloqueado', tone: 'bad' },
  retro: { l: 'Data passada', tone: 'bad' },
  suspenso: { l: 'Suspenso', tone: 'bad' },
  falhou: { l: 'Falhou', tone: 'bad' },
  recusado: { l: 'Recusado', tone: 'bad' },
  divergencia: { l: 'Divergência', tone: 'bad' },
  risco: { l: 'Em risco', tone: 'bad' },
  congelado: { l: 'Congelado', tone: 'neutral' },
  rede: { l: 'Na rede', tone: 'ink' },
};

export const GYM = { nome: 'Mwangolé Fit', operador: 'Celma Bento', operadorPapel: 'Recepção', dono: 'Paulo Mwangolé' };

export type FilialKey = 'talatona' | 'kilamba' | 'maianga';
export const FIL: Record<FilialKey, { n: string; e: number; r: number; a: number; ch: string; o: string }> = {
  talatona: { n: 'Talatona', e: 1240000, r: 1196000, a: 612, ch: '2,8%', o: '71%' },
  kilamba: { n: 'Kilamba', e: 780000, r: 712000, a: 428, ch: '3,6%', o: '64%' },
  maianga: { n: 'Maianga', e: 430000, r: 394000, a: 244, ch: '3,1%', o: '58%' },
};

export const CHECKINS = [
  { h: '07:42', n: 'Ana Domingos', p: 'Rede · Mensal', f: 'Talatona', s: 'pago' as StatusKey, why: '' },
  { h: '07:38', n: 'Edson Mateus', p: 'Local · Mensal', f: 'Talatona', s: 'pago' as StatusKey, why: '' },
  { h: '07:31', n: 'Joana Kiala', p: 'Híbrido', f: 'Kilamba → Talatona', s: 'rede' as StatusKey, why: '2 de 4 entradas noutra filial' },
  { h: '07:25', n: 'Mário Sebastião', p: 'Local · Trimestral', f: 'Talatona', s: 'vencer' as StatusKey, why: 'Vence amanhã · SMS às 10:00' },
  { h: '07:12', n: 'Yola Fernandes', p: 'Local · Mensal', f: 'Talatona', s: 'bloq' as StatusKey, why: 'Expirou há 3 dias' },
  { h: '07:04', n: 'Nelson Kapinga', p: 'Rede · Anual', f: 'Talatona', s: 'pago' as StatusKey, why: '' },
];

export const DIVIDA = [
  { n: 'Yola Fernandes', d: 'Expirou há 3 dias', v: 30000 },
  { n: 'Délcio Ngola', d: 'Por pagar há 12 dias', v: 45000 },
];

export const VENCER = [
  { n: 'Mário Sebastião', d: 'Vence amanhã', v: 30000 },
  { n: 'Paulina Muxima', d: 'Vence em 3 dias', v: 45000 },
  { n: 'Wilson Tchiyaka', d: 'Vence em 5 dias', v: 38000 },
];

export const PLANS = [
  { id: 'local', n: 'Local', scope: 'Local', d: 'Só a filial Talatona', p: 30000 },
  { id: 'rede', n: 'Rede', scope: 'Rede', d: 'Todas as filiais', p: 45000 },
  { id: 'hibrido', n: 'Híbrido', scope: 'Híbrido', d: 'Talatona + 4 entradas/mês noutras', p: 38000 },
  { id: 'teste', n: 'Teste grátis', scope: '7 dias', d: '1 por pessoa, validado por BI e telefone', p: 0, disabled: true, note: 'Já usado por este BI em 12/03/2026' },
];

export const PAY_METHODS = [
  { id: 'express', l: 'Multicaixa Express', d: 'Push no telemóvel' },
  { id: 'tpa', l: 'TPA', d: 'Cartão' },
  { id: 'ref', l: 'Transferência', d: 'Por referência' },
  { id: 'dinheiro', l: 'Dinheiro', d: 'Conta no caixa' },
];

export const CLIENTE_BI = [
  { l: 'Nome completo', v: 'Kátia Domingos Muondo' },
  { l: 'Data de nascimento', v: '14/08/1996' },
  { l: 'NIF', v: '005812347LA041' },
  { l: 'Telefone', v: '923 456 789' },
];

/** Valores esperados por meio no fecho de caixa (ocultos até à contagem). */
export const CAIXA_ESPERADO = { dinheiro: 88000, express: 64500, tpa: 22000, transf: 10000 };
export const CAIXA_MEIOS: { k: keyof typeof CAIXA_ESPERADO; l: string }[] = [
  { k: 'dinheiro', l: 'Dinheiro' },
  { k: 'express', l: 'Multicaixa Express' },
  { k: 'tpa', l: 'TPA' },
  { k: 'transf', l: 'Transferência' },
];

export type LedgerRow = { id: number; h: string; d: string; o: string; m: string; v: number; st: StatusKey; fac: string; note?: string };
export const LEDGER: LedgerRow[] = [
  { id: 1, h: '09:12', d: 'Mensalidade Rede', o: 'Ana Domingos · #4821', m: 'Multicaixa Express', v: 45000, st: 'ok', fac: 'FR TAL/2026/1201' },
  { id: 2, h: '08:55', d: 'Bar · 2 águas, 1 batido', o: 'Venda #1093', m: 'Dinheiro', v: 3500, st: 'ok', fac: 'FR TAL/2026/1200' },
  { id: 3, h: '08:40', d: 'Estorno · cobrança duplicada', o: 'Edson Mateus · #4790', m: 'TPA', v: -30000, st: 'pendente', fac: 'NC TAL/2026/0031', note: 'Estorno pedido às 08:40. A aguardar aprovação do dono.' },
  { id: 4, h: '08:21', d: 'Inscrição Local', o: 'Kátia Muondo · #4822', m: 'TPA', v: 30000, st: 'ok', fac: 'FR TAL/2026/1199' },
  { id: 5, h: '08:02', d: 'Despesa · limpeza', o: 'Recibo anexado', m: 'Dinheiro', v: -12500, st: 'ok', fac: '—' },
  { id: 6, h: '07:48', d: 'Mensalidade com data de 20/10', o: 'Mário Sebastião · #4511', m: 'Dinheiro', v: 30000, st: 'retro', fac: '—', note: 'Movimentos com data passada precisam de aprovação. Pedido enviado ao dono.' },
  { id: 7, h: '07:30', d: 'Mensalidade Híbrido', o: 'Joana Kiala · #4602', m: 'Transferência', v: 38000, st: 'ok', fac: 'FR TAL/2026/1198' },
  { id: 8, h: '07:00', d: 'Abertura de caixa', o: 'Turno da manhã', m: 'Dinheiro', v: 20000, st: 'ok', fac: '—' },
];

export const LINES = [
  { t: 'Estorno a aguardar aprovação · Edson Mateus', f: 'talatona' as FilialKey, v: 30000 },
  { t: 'Desconto acima do limite (25%)', f: 'talatona' as FilialKey, v: 14000 },
  { t: '2 subscrições activadas sem pagamento', f: 'kilamba' as FilialKey, v: 60000 },
  { t: 'Diferença no fecho de caixa · tarde', f: 'kilamba' as FilialKey, v: 8000 },
  { t: 'Mensalidades em atraso há mais de 30 dias', f: 'maianga' as FilialKey, v: 36000 },
];

export const FUGAS = [
  { t: '2 subscrições activadas sem pagamento por Rui Manuel', f: 'kilamba' as FilialKey, h: 'hoje 09:14' },
  { t: 'Membro gratuito com 14 check-ins esta semana', f: 'talatona' as FilialKey, h: 'ontem' },
  { t: 'Movimento de caixa às 23:12, fora do horário', f: 'maianga' as FilialKey, h: 'sábado' },
  { t: 'Operador com estornos 3× acima da média', f: 'kilamba' as FilialKey, h: 'esta semana' },
];

export const OCC = [22, 48, 64, 41, 28, 20, 24, 30, 26, 22, 30, 52, 78, 92, 70, 44, 18];

export type Approval = { id: string; kind: 'estorno' | 'caixa' | 'preco' | 'retro' | 'turno'; k: string; t: string; v: number; status?: 'aprovado' | 'recusado' };
export const APPROVALS: Approval[] = [
  { id: 'a1', kind: 'estorno', k: 'Estorno · Talatona · 08:40', t: 'Edson Mateus · cobrança duplicada no TPA. Pedido por Celma Bento.', v: -30000 },
  { id: 'a2', kind: 'caixa', k: 'Fecho de caixa · Kilamba', t: 'Diferença no turno da tarde. Justificação: troco dado a mais.', v: -8000 },
  { id: 'a3', kind: 'preco', k: 'Preço · Rede Mensal', t: 'De 45 000 para 50 000 Kz. Os 286 membros recebem SMS 30 dias antes.', v: 50000 },
];

export const PLANOS = [
  { id: 1, n: 'Local Mensal', scope: 'Local', p: 30000, acesso: 'Filial de inscrição', hor: '06:00–22:00', desc: '10%', ativos: 412 },
  { id: 2, n: 'Rede Mensal', scope: 'Rede', p: 45000, acesso: 'Todas as filiais', hor: '06:00–22:00', desc: '10%', ativos: 286 },
  { id: 3, n: 'Híbrido', scope: 'Híbrido', p: 38000, acesso: 'Base + 4 entradas/mês', hor: '06:00–22:00', desc: '10%', ativos: 142 },
  { id: 4, n: 'Piscina Manhã', scope: 'Por horário', p: 15000, acesso: 'Piscina · Talatona', hor: '06:00–10:00', desc: '5%', ativos: 58 },
  { id: 5, n: 'Rede Anual', scope: 'Rede', p: 450000, acesso: 'Todas as filiais', hor: '06:00–22:00', desc: '15%', ativos: 96 },
  { id: 6, n: 'Estudante', scope: 'Local', p: 22000, acesso: 'Filial de inscrição', hor: '10:00–17:00', desc: '0%', ativos: 0 },
];

export const REGRAS = [
  ['Tolerância antes de bloquear', '7 dias'],
  ['Desconto máximo · recepção', '10%'],
  ['Congelamento máximo por ano', '30 dias'],
  ['Teste grátis', '1 por BI e telefone'],
  ['Movimentos com data passada', 'Exigem aprovação do dono'],
  ['Aviso de mudança de preço', 'SMS 30 dias antes'],
] as const;

export const PARCEIROS = [
  { n: 'Kianda Fitness', c: 'Luanda · Talatona', rec: 64, env: 31, v: 54000, s: 'ativo' as StatusKey, why: '' },
  { n: 'Benguela Gym Center', c: 'Benguela', rec: 12, env: 18, v: -9000, s: 'ativo' as StatusKey, why: '' },
  { n: 'Huambo Power', c: 'Huambo', rec: 0, env: 0, v: 0, s: 'convite' as StatusKey, why: 'Enviado a 22/10' },
  { n: 'Lobito Strong', c: 'Lobito', rec: 22, env: 9, v: 19500, s: 'suspenso' as StatusKey, why: 'Liquidação de Setembro por pagar' },
  { n: 'Viana Box', c: 'Luanda · Viana', rec: 30, env: 14, v: 29500, s: 'ativo' as StatusKey, why: '' },
];

export const SAMPLE_VARS = { nome: 'Kátia', valor: '45 000 Kz', data: '13/11', referencia: '00512 884 231', ginasio: 'Mwangolé Fit' };

export type Rule = { n: string; trig: string; hora: string; ch: string; on: boolean; sent: number; tpl: string };
export const RULES: Rule[] = [
  { n: 'Boas-vindas', trig: 'Após inscrição paga', hora: 'Imediato', ch: 'WhatsApp', on: true, sent: 38, tpl: 'Bem-vinda ao {ginasio}, {nome}! O teu QR de acesso: muntu.ao/q/8KD2. Plano activo até {data}.' },
  { n: 'Vence em 3 dias', trig: '3 dias antes do vencimento', hora: '10:00', ch: 'SMS', on: true, sent: 412, tpl: '{ginasio}: Olá {nome}, a tua mensalidade de {valor} vence a {data}. Paga por Multicaixa Express ou ref. {referencia}.' },
  { n: 'Vence hoje', trig: 'No dia do vencimento', hora: '08:00', ch: 'SMS', on: true, sent: 296, tpl: '{ginasio}: {nome}, a tua mensalidade de {valor} vence hoje. Ref. Multicaixa {referencia}.' },
  { n: 'Em atraso', trig: '3 dias após o vencimento', hora: '10:00', ch: 'SMS', on: true, sent: 188, tpl: '{ginasio}: {nome}, a mensalidade de {valor} está em atraso desde {data}. Regulariza para manter o acesso. Ref. {referencia}.' },
  { n: 'Acesso bloqueado', trig: '7 dias após o vencimento', hora: '10:00', ch: 'SMS', on: true, sent: 64, tpl: '{ginasio}: {nome}, o teu acesso foi suspenso por falta de pagamento ({valor}). Paga com a ref. {referencia} e entra de imediato.' },
  { n: 'Pagamento confirmado', trig: 'Quando o pagamento entra', hora: 'Imediato', ch: 'SMS', on: true, sent: 251, tpl: '{ginasio}: Recebemos {valor}. Obrigado, {nome}! Factura em muntu.ao/f/TAL1202.' },
  { n: 'Fim de congelamento', trig: '1 dia antes de reactivar', hora: '09:00', ch: 'SMS', on: true, sent: 12, tpl: '{ginasio}: {nome}, o teu plano volta a estar activo a {data}. Até já!' },
  { n: 'Sentimos a tua falta', trig: '14 dias sem check-in', hora: '18:00', ch: 'SMS', on: false, sent: 0, tpl: '{nome}, há 14 dias que não te vemos no {ginasio}. O teu plano continua activo até {data}.' },
  { n: 'Aniversário', trig: 'No dia de anos', hora: '09:00', ch: 'WhatsApp', on: false, sent: 0, tpl: 'Parabéns, {nome}! O {ginasio} oferece-te um batido no bar esta semana.' },
];

export const SMS_LOG = [
  { id: 1, h: '10:00', n: 'Mário Sebastião', tel: '923 114 802', a: 'Vence em 3 dias', ch: 'SMS', st: 'agendado' as StatusKey, why: 'Na fila' },
  { id: 2, h: '10:00', n: 'Paulina Muxima', tel: '912 778 340', a: 'Vence em 3 dias', ch: 'SMS', st: 'agendado' as StatusKey, why: 'Na fila' },
  { id: 3, h: '09:14', n: 'Kátia Muondo', tel: '923 456 789', a: 'Boas-vindas', ch: 'WhatsApp', st: 'entregue' as StatusKey, why: 'Lida 09:15' },
  { id: 4, h: '08:00', n: 'Yola Fernandes', tel: '931 220 517', a: 'Em atraso', ch: 'SMS', st: 'entregue' as StatusKey, why: '' },
  { id: 5, h: '08:00', n: 'Délcio Ngola', tel: '924 663 091', a: 'Em atraso', ch: 'SMS', st: 'entregue' as StatusKey, why: '' },
  { id: 6, h: '08:00', n: 'Ivone Cassoma', tel: '92 300 1', a: 'Em atraso', ch: 'SMS', st: 'falhou' as StatusKey, why: 'Número inválido' },
  { id: 7, h: '07:42', n: 'Ana Domingos', tel: '923 870 115', a: 'Pagamento confirmado', ch: 'SMS', st: 'entregue' as StatusKey, why: '' },
  { id: 8, h: 'Ontem', n: 'Wilson Tchiyaka', tel: '926 551 004', a: 'Vence hoje', ch: 'SMS', st: 'falhou' as StatusKey, why: 'Telefone desligado' },
];

// ——— Passagem de turno ———
export const TURNO = {
  sai: { n: 'Celma Bento', turno: 'Manhã', h: '07:00–14:00' },
  entra: { n: 'Rui Manuel', turno: 'Tarde', h: '14:00–22:00' },
  /** Declarado por quem sai (oculto para quem recebe até contar). */
  declarado: { dinheiro: 86000, tpa: 22000 },
};

export const TURNO_PAGAMENTOS = [
  { id: 'p1', n: 'Ana Domingos', d: 'Mensalidade Rede · Express', v: 45000, h: '09:12' },
  { id: 'p2', n: 'Kátia Muondo', d: 'Inscrição Local · TPA', v: 30000, h: '08:21' },
  { id: 'p3', n: 'Joana Kiala', d: 'Mensalidade Híbrido · Transferência', v: 38000, h: '07:30' },
];

export const TURNO_PENDENCIAS = [
  { id: 'q1', t: 'Ligar a Délcio Ngola sobre a mensalidade em atraso', d: 'Prometeu pagar hoje até às 18:00' },
  { id: 'q2', t: 'Toalhas da sauna por repor', d: 'Fornecedor entrega às 16:00' },
  { id: 'q3', t: 'Estorno de Edson Mateus aguarda o dono', d: 'Não voltar a cobrar no TPA' },
];

export const TURNO_TRILHA = [
  { h: '13:58', q: 'Celma Bento', t: 'Declarou o caixa: 86 000,00 em dinheiro, 22 000,00 em TPA' },
  { h: '13:52', q: 'Celma Bento', t: 'Registou 3 pendências para o turno da tarde' },
  { h: '07:00', q: 'Celma Bento', t: 'Abriu o caixa com 20 000,00' },
  { h: 'Ontem 22:04', q: 'Rui Manuel', t: 'Fechou o turno da noite sem diferença' },
];

// ——— Retenção ———
export type RiskMember = { id: string; n: string; plano: string; f: string; signals: string[]; score: number; renov: string; valor: number; tel: string };
export const RISK: RiskMember[] = [
  { id: 'r1', n: 'Paulina Muxima', plano: 'Rede · Mensal', f: 'Talatona', signals: ['2 entradas em 21 dias (antes 12)', 'Renova em 3 dias', '4 sessões de PT por realizar'], score: 92, renov: '01/11', valor: 45000, tel: '912 778 340' },
  { id: 'r2', n: 'Wilson Tchiyaka', plano: 'Híbrido', f: 'Kilamba', signals: ['Sem entradas há 16 dias', 'Renova em 5 dias'], score: 84, renov: '03/11', valor: 38000, tel: '926 551 004' },
  { id: 'r3', n: 'Ivone Cassoma', plano: 'Local · Trimestral', f: 'Maianga', signals: ['Avaliação física em falta', 'Frequência −60% este mês'], score: 71, renov: '19/11', valor: 84000, tel: '923 001 774' },
  { id: 'r4', n: 'Hélder Mbala', plano: 'Rede · Anual', f: 'Talatona', signals: ['3 aulas reservadas sem comparecer', 'Pediu informação de congelamento'], score: 66, renov: '02/02', valor: 450000, tel: '931 450 218' },
  { id: 'r5', n: 'Teresa Lukamba', plano: 'Local · Mensal', f: 'Kilamba', signals: ['Sem entradas há 9 dias', 'Renova em 8 dias'], score: 58, renov: '06/11', valor: 30000, tel: '924 118 905' },
];

export const TAREFAS_INICIAIS = [
  { id: 't1', n: 'Nelson Kapinga', t: 'Remarcar avaliação física em falta', quem: 'Treinador Abel', st: 'emcurso' as StatusKey, res: '' },
  { id: 't2', n: 'Yola Fernandes', t: 'Contactar sobre renovação', quem: 'Celma Bento', st: 'feito' as StatusKey, res: 'Renovou por 3 meses com 5% de desconto' },
];

// ——— App do membro ———
export const MEMBRO = {
  nome: 'Kátia Muondo',
  primeiro: 'Kátia',
  plano: 'Rede · Mensal',
  dias: 18,
  prox: '13 Nov',
  valor: 45000,
  filiais: ['Talatona · base', 'Kilamba', 'Maianga'],
  pagamentos: [
    { t: 'Outubro', d: '13 Out · Express', v: 45000 },
    { t: 'Setembro', d: '13 Set · Express', v: 45000 },
    { t: 'Agosto', d: '13 Ago · Dinheiro', v: 45000 },
  ],
  entradas: [
    { d: 'Hoje · 07:15', f: 'Talatona' },
    { d: 'Ter · 18:40', f: 'Kilamba' },
    { d: 'Seg · 06:58', f: 'Talatona' },
  ],
};
