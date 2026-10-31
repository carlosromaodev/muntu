import { createHash } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import type { AuthCtx } from '../auth/context.js';
import { Clock } from '../common/clock.js';
import { notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { branches, invoiceAgtEvents, invoices, invoiceSeries, type DocType } from '../db/schema.js';

export type Invoice = typeof invoices.$inferSelect;

/**
 * Facturação (RF-FAC, RN-30 a RN-34).
 *  - Numeração por tipo + série (filial) + ano, sequencial e sem falhas: a linha
 *    da série é bloqueada (FOR UPDATE) durante a emissão.
 *  - Cada documento guarda o hash do anterior da mesma série (cadeia).
 *  - Documentos não se alteram (trigger na base de dados); corrige-se com NC.
 *  - A comunicação à AGT é assíncrona: o documento nasce "por comunicar".
 */
@Injectable()
export class InvoicesService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
  ) {}

  async issue(tx: Tx, ctx: AuthCtx, input: { branchId: string; docType: DocType; description: string; totalCents: number; memberId?: string | null; paymentId?: string | null; referencesId?: string | null; reason?: string | null }): Promise<Invoice> {
    const issuedAt = this.clock.now();
    const year = Number(this.clock.today().slice(0, 4));
    const [branch] = await tx.select().from(branches).where(eq(branches.id, input.branchId));
    if (!branch) throw notFound('Filial');
    await tx
      .insert(invoiceSeries)
      .values({ id: uuidv7(), orgId: ctx.orgId, branchId: input.branchId, docType: input.docType, year, code: `${branch.code}${year}` })
      .onConflictDoNothing();
    const [series] = await tx
      .select()
      .from(invoiceSeries)
      .where(and(eq(invoiceSeries.orgId, ctx.orgId), eq(invoiceSeries.branchId, input.branchId), eq(invoiceSeries.docType, input.docType), eq(invoiceSeries.year, year)))
      .for('update');
    const number = series!.nextNumber;
    const fullNumber = `${input.docType} ${series!.code}/${number}`;
    const prevHash = series!.lastHash;
    const hash = createHash('sha256').update([prevHash, issuedAt.toISOString(), fullNumber, input.totalCents, input.memberId ?? '', input.description].join(';')).digest('base64');
    const id = uuidv7();
    await tx.insert(invoices).values({
      id,
      orgId: ctx.orgId,
      branchId: input.branchId,
      seriesId: series!.id,
      docType: input.docType,
      number,
      fullNumber,
      memberId: input.memberId ?? null,
      paymentId: input.paymentId ?? null,
      referencesId: input.referencesId ?? null,
      description: input.description,
      totalCents: input.totalCents,
      taxCents: 0,
      reason: input.reason ?? null,
      hash,
      prevHash,
      issuedBy: ctx.userId,
      issuedAt,
    });
    await tx.update(invoiceSeries).set({ nextNumber: number + 1, lastHash: hash }).where(eq(invoiceSeries.id, series!.id));
    await tx.insert(invoiceAgtEvents).values({ id: uuidv7(), orgId: ctx.orgId, invoiceId: id, status: 'por_comunicar' });
    return (await tx.select().from(invoices).where(eq(invoices.id, id)))[0]!;
  }

  async byPayment(tx: Tx, paymentId: string) {
    return (await tx.select().from(invoices).where(and(eq(invoices.paymentId, paymentId), eq(invoices.docType, 'FR'))))[0] ?? null;
  }

  list(ctx: AuthCtx, branchId?: string) {
    return this.database.withOrg(ctx, (tx) =>
      tx
        .select()
        .from(invoices)
        .where(and(eq(invoices.orgId, ctx.orgId), branchId ? eq(invoices.branchId, branchId) : undefined))
        .orderBy(desc(invoices.issuedAt))
        .limit(200),
    );
  }
}
