import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { Tx } from '../db/database.js';
import { organizations, type OrgSettings } from '../db/schema.js';

/** Regras configuráveis pelo dono, com os valores por omissão de docs/requisitos/04. */
export const DEFAULT_SETTINGS: Required<OrgSettings> = {
  toleranceDays: 7,
  warnDays: 5,
  trialDays: 7,
  freezeMaxDaysYear: 30,
  discountLimits: { rececao: 10, gerente: 25 },
  refundLimitFinancasCents: 0,
  expenseLimitFinancasCents: 2_000_000,
  expenseReceiptAboveCents: 500_000,
  antiPassbackMinutes: 5,
  avgStayMinutes: 90,
  approvalTtlHours: 48,
  priceNoticeDays: 30,
};

export type Settings = Required<OrgSettings>;

@Injectable()
export class SettingsService {
  async get(tx: Tx, orgId: string): Promise<Settings> {
    const [org] = await tx.select({ settings: organizations.settings }).from(organizations).where(eq(organizations.id, orgId));
    return { ...DEFAULT_SETTINGS, ...(org?.settings ?? {}) };
  }
}
