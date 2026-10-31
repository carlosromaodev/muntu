/**
 * Fornecedores de envio. Em produção liga-se o agregador de SMS/WhatsApp;
 * em desenvolvimento e nos testes, o fornecedor "registo" guarda as mensagens
 * em memória e escreve-as no log, sem enviar nada.
 */
export type SendResult = { ok: true; ref: string } | { ok: false; error: string; retry: boolean };

export interface MessageProvider {
  readonly name: string;
  send(channel: 'sms' | 'whatsapp', to: string, body: string): Promise<SendResult>;
}

export const MESSAGE_PROVIDER = Symbol('MESSAGE_PROVIDER');

export class LogProvider implements MessageProvider {
  readonly name = 'registo';
  readonly sent: { channel: string; to: string; body: string }[] = [];
  /** Números que falham (para testar a repetição). */
  failing = new Set<string>();
  private seq = 0;

  constructor(private readonly verbose = false) {}

  async send(channel: 'sms' | 'whatsapp', to: string, body: string): Promise<SendResult> {
    if (this.failing.has(to)) return { ok: false, error: 'Fornecedor indisponível (simulado).', retry: true };
    this.sent.push({ channel, to, body });
    if (this.verbose) console.log(`[${channel}] → ${to}: ${body}`);
    return { ok: true, ref: `log-${++this.seq}` };
  }
}
