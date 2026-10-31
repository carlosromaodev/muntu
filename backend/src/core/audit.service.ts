import { Injectable } from '@nestjs/common';
import type { AuthCtx } from '../auth/context.js';
import { uuidv7 } from '../common/ids.js';
import type { Tx } from '../db/database.js';
import { auditLog } from '../db/schema.js';

/** Trilha de auditoria só de acrescentar (RF-AUD-01, RNF-20). */
@Injectable()
export class AuditService {
  async record(tx: Tx, ctx: Pick<AuthCtx, 'orgId' | 'userId'>, action: string, entity: string, entityId: string | null, after?: unknown, before?: unknown) {
    await tx.insert(auditLog).values({ id: uuidv7(), orgId: ctx.orgId, actorUserId: ctx.userId, action, entity, entityId, after: after ?? null, before: before ?? null });
  }
}
