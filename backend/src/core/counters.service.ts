import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import type { Tx } from '../db/database.js';
import { counters } from '../db/schema.js';

/** Números sequenciais por organização (n.º de membro, ocorrências), sem falhas sob concorrência. */
@Injectable()
export class CountersService {
  async next(tx: Tx, orgId: string, name: string, start = 1): Promise<number> {
    const [row] = await tx
      .insert(counters)
      .values({ orgId, name, value: start })
      .onConflictDoUpdate({ target: [counters.orgId, counters.name], set: { value: sql`${counters.value} + 1` } })
      .returning({ value: counters.value });
    return row!.value;
  }
}
