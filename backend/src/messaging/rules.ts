import { eq } from 'drizzle-orm';
import type { Tx } from '../db/database.js';
import { messageRules } from '../db/schema.js';
import { DEFAULT_RULES, RULE_KINDS, type Rule, type RuleKind } from './templates.js';

/** Regras efectivas da organização: as gravadas pelo dono sobre as de omissão. */
export async function effectiveRules(tx: Tx, orgId: string): Promise<Record<RuleKind, Rule>> {
  const saved = await tx.select().from(messageRules).where(eq(messageRules.orgId, orgId));
  const out = {} as Record<RuleKind, Rule>;
  for (const kind of RULE_KINDS) {
    const s = saved.find((r) => r.kind === kind);
    out[kind] = { kind, ...DEFAULT_RULES[kind], ...(s ? { enabled: s.enabled, channel: s.channel, template: s.template, sendHour: s.sendHour } : {}) };
  }
  return out;
}
