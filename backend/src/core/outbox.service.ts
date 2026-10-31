import { Injectable } from '@nestjs/common';
import { uuidv7 } from '../common/ids.js';
import type { Tx } from '../db/database.js';
import { outbox } from '../db/schema.js';

/**
 * Mensagens a enviar (SMS, push, WhatsApp). Gravadas na mesma transacção que o
 * facto que as origina e enviadas depois por um processo à parte, com repetição
 * (RNF-53): uma integração em baixo nunca bloqueia a recepção.
 */
@Injectable()
export class OutboxService {
  async enqueue(tx: Tx, orgId: string, channel: 'sms' | 'push' | 'whatsapp', target: string, template: string, payload: Record<string, unknown>, dedupeKey?: string) {
    await tx
      .insert(outbox)
      .values({ id: uuidv7(), orgId, channel, target, template, payload, dedupeKey: dedupeKey ?? null })
      .onConflictDoNothing();
  }
}
