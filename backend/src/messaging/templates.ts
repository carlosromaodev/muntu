/**
 * Modelos de mensagem (RN-76). Variáveis entre chavetas: {nome}, {valor}, {data},
 * {referencia}, {ginasio}… As variáveis em falta ficam vazias.
 */

/** Regras automáticas configuráveis pelo dono (RF-AVI-02). */
export const RULE_KINDS = ['boas_vindas', 'vence_3d', 'vence_hoje', 'em_atraso', 'bloqueado', 'pagamento_confirmado', 'saudades', 'aniversario'] as const;
export type RuleKind = (typeof RULE_KINDS)[number];

export type Rule = { kind: RuleKind; enabled: boolean; channel: 'sms' | 'whatsapp'; template: string; sendHour: number; promotional: boolean; label: string; when: string };

export const DEFAULT_RULES: Record<RuleKind, Omit<Rule, 'kind'>> = {
  boas_vindas: { label: 'Boas-vindas', when: 'No dia em que a primeira subscrição começa', enabled: true, channel: 'sms', sendHour: 10, promotional: false, template: 'Bem-vindo(a) ao {ginasio}, {nome}! O teu plano {plano} está activo até {data}. Bons treinos.' },
  vence_3d: { label: 'Vence em 3 dias', when: '3 dias antes do vencimento', enabled: true, channel: 'sms', sendHour: 10, promotional: false, template: '{ginasio}: olá {nome}, a tua mensalidade ({valor}) vence a {data}. Paga na recepção ou na app.' },
  vence_hoje: { label: 'Vence hoje', when: 'No dia do vencimento', enabled: true, channel: 'sms', sendHour: 8, promotional: false, template: '{ginasio}: {nome}, a tua mensalidade ({valor}) vence hoje. Paga para continuares a entrar.' },
  em_atraso: { label: 'Em atraso', when: '3 dias depois do vencimento', enabled: true, channel: 'sms', sendHour: 10, promotional: false, template: '{ginasio}: {nome}, a tua mensalidade venceu a {data}. Regulariza até {bloqueio} para não ficares sem acesso.' },
  bloqueado: { label: 'Acesso bloqueado', when: 'No fim da tolerância', enabled: true, channel: 'sms', sendHour: 9, promotional: false, template: '{ginasio}: {nome}, o teu acesso foi suspenso por falta de pagamento. Paga {valor} na recepção ou na app para voltares.' },
  pagamento_confirmado: { label: 'Pagamento confirmado', when: 'Logo que o pagamento é confirmado', enabled: true, channel: 'sms', sendHour: 0, promotional: false, template: '{ginasio}: recebemos {valor}. Factura {factura}. Obrigado, {nome}!' },
  saudades: { label: 'Sentimos a tua falta', when: '14 dias sem entrar, com o plano activo', enabled: false, channel: 'sms', sendHour: 17, promotional: true, template: '{ginasio}: {nome}, há {dias} dias que não te vemos. O teu plano continua activo, esperamos-te!' },
  aniversario: { label: 'Aniversário', when: 'No dia de anos do membro', enabled: true, channel: 'sms', sendHour: 9, promotional: true, template: 'Parabéns, {nome}! A equipa do {ginasio} deseja-te um óptimo dia.' },
};

/** Mensagens de serviço que não dependem de regras (SMS) e textos das notificações na app (push). */
export const SERVICE_TEMPLATES: Record<string, string> = {
  'membro.credenciais': 'Olá {nome}, já podes usar a app do {ginasio} na MUNTU. Entra com o teu número e a senha temporária {senha}.',
  'equipa.convite': '{nome}, foste convidado(a) para a equipa do {ginasio} na MUNTU. Entra com o teu número e a senha temporária {senha}.',
  'ocorrencia.estado': '{ginasio}: a tua ocorrência {code} está agora {estado}.',
  'plano.novo_preco': '{ginasio}: o preço do teu plano passa a {valor} a partir da renovação daqui a {diasAviso} dias.',
};

export const PUSH_TEMPLATES: Record<string, { title: string; body: string }> = {
  'caixa.diferenca': { title: 'Diferença de caixa', body: 'Turno fechado com diferença de {diferenca}. Justificação: {justificacao}' },
  'caixa.revisao': { title: 'Caixa para rever', body: 'Diferença de {diferenca} enviada para revisão. Justificação: {justificacao}' },
  'turno.sem_colega': { title: 'Turno recebido sem colega', body: 'Motivo: {motivo}' },
  'ocorrencia.urgente': { title: 'Ocorrência urgente', body: '{code} · {type} · {zone}' },
  'aprovacao.pedido': { title: 'Pedido de aprovação', body: '{tipo} {valor} · {motivo}' },
  'aprovacao.aprovada': { title: 'Pedido aprovado', body: 'O teu pedido de {tipo} foi aprovado.' },
  'aprovacao.recusada': { title: 'Pedido recusado', body: 'O teu pedido de {tipo} foi recusado.' },
  'pendencia.atribuida': { title: 'Nova pendência', body: '{titulo}' },
  'aviso.novo': { title: 'Aviso da gestão', body: '{texto}' },
  'aviso.urgente': { title: 'Aviso urgente', body: '{texto}' },
};

const LABELS: Record<string, string> = {
  em_analise: 'em análise',
  resolvida: 'resolvida',
  estorno: 'estorno',
  desconto: 'desconto',
  activar_sem_pagamento: 'activação sem pagamento',
  despesa: 'despesa',
  preco: 'alteração de preço',
  reabrir_caixa: 'reabrir caixa',
  data_passada: 'data passada',
  entrada_manual: 'entrada manual',
};

/** Substitui as variáveis; valores em falta ficam vazios e espaços duplos colapsam. */
export function render(template: string, vars: Record<string, unknown>): string {
  return template
    .replace(/\{(\w+)\}/g, (_, k: string) => {
      const v = vars[k];
      if (v === null || v === undefined) return '';
      return typeof v === 'string' ? (LABELS[v] ?? v) : String(v);
    })
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([.,:;!?])/g, '$1')
    .trim();
}

/** Template de uma mensagem do outbox que pertence a uma regra (ex.: `regra.vence_3d`). */
export const ruleOf = (template: string): RuleKind | null => {
  if (template === 'pagamento.confirmado') return 'pagamento_confirmado';
  const k = template.startsWith('regra.') ? template.slice(6) : '';
  return (RULE_KINDS as readonly string[]).includes(k) ? (k as RuleKind) : null;
};
