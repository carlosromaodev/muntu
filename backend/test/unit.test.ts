import 'reflect-metadata';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { evaluateAccess, qrToken, readQr, type AccessFacts } from '../src/access/access.service.js';
import { branchCode } from '../src/auth/auth.service.js';
import { hashPassword, verifyPassword } from '../src/auth/password.js';
import { signAccess, verifyAccess } from '../src/auth/tokens.js';
import { addDays, daysBetween, luandaDate } from '../src/common/clock.js';
import { uuidv7 } from '../src/common/ids.js';
import { applyDiscount, countTotal, kz } from '../src/common/money.js';

const base: AccessFacts = { status: 'pago', days: 10, scope: 'local', planBranchId: 'A', subBranchId: 'A', branchId: 'A', hoursFrom: null, hoursTo: null, nowMinutes: 9 * 60, minutesSinceLastEntry: null, lastEntryBranchId: null, otherBranchEntriesThisMonth: 0, otherEntriesMonth: 0, inside: 10, capacity: 120 };
const S = { antiPassbackMinutes: 5 };

describe('Regras puras', () => {
  it('formata kwanzas com espaço nos milhares e cêntimos', () => {
    assert.equal(kz(3_000_000), '30 000,00 Kz');
    assert.equal(kz(1_243_450), '12 434,50 Kz');
    assert.equal(kz(-500_000), '−5 000,00 Kz');
  });

  it('conta notas, moedas e avulso em cêntimos (RN-15)', () => {
    assert.equal(countTotal({ '5000': 10, '2000': 8, '100': 3, '1': 2 }, 50), 6_630_250);
    assert.equal(countTotal({ '7000': 5 }), 0, 'denominações inexistentes não contam');
  });

  it('desconto arredonda ao cêntimo', () => assert.equal(applyDiscount(3_000_000, 10), 2_700_000));

  it('datas de Luanda e contas de dias', () => {
    assert.equal(luandaDate(new Date('2026-10-30T23:30:00Z')), '2026-10-31');
    assert.equal(addDays('2026-10-30', 29), '2026-11-28');
    assert.equal(daysBetween('2026-11-28', '2026-12-08'), 10);
  });

  it('UUID v7 ordenável no tempo', () => {
    const a = uuidv7(1_700_000_000_000);
    const b = uuidv7(1_700_000_000_001);
    assert.match(a, /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.ok(a < b);
  });

  it('senha com scrypt', async () => {
    const h = await hashPassword('segredo1');
    assert.ok(await verifyPassword('segredo1', h));
    assert.ok(!(await verifyPassword('segredo2', h)));
  });

  it('token de acesso assinado e com validade', () => {
    const t = signAccess({ sub: 'u', org: 'o', roles: ['dono'], br: null, mem: null }, 'x'.repeat(32), 15, 0);
    assert.equal(verifyAccess(t, 'x'.repeat(32), 1000)?.sub, 'u');
    assert.equal(verifyAccess(t, 'y'.repeat(32), 1000), null);
    assert.equal(verifyAccess(t, 'x'.repeat(32), 16 * 60_000), null);
  });

  it('código da série a partir do nome da filial', () => {
    const taken = new Set<string>();
    assert.equal(branchCode('Talatona', taken), 'TAL');
    assert.equal(branchCode('Talatona Sul', taken), 'TA2');
    assert.equal(branchCode('Maianga', taken), 'MAI');
  });

  it('QR vale na janela actual e na anterior', () => {
    const now = 1_800_000_000_000;
    const { token } = qrToken('s'.repeat(32), 'org', 'mem', now);
    assert.equal(readQr('s'.repeat(32), 'org', token, now + 29_000), 'mem');
    assert.equal(readQr('s'.repeat(32), 'org', token, now + 61_000), null);
    assert.equal(readQr('s'.repeat(32), 'outra-org', token, now), null);
  });

  it('regras de acesso pela ordem de RN-04', () => {
    assert.equal(evaluateAccess(base, S).ok, true);
    assert.equal(evaluateAccess({ ...base, status: 'bloqueado', days: -9 }, S).reason, 'Plano expirou há 9 dias.');
    assert.equal(evaluateAccess({ ...base, branchId: 'B' }, S).reason, 'O plano não dá acesso a esta filial.');
    assert.equal(evaluateAccess({ ...base, scope: 'rede', branchId: 'B' }, S).ok, true);
    assert.match(evaluateAccess({ ...base, scope: 'hibrido', branchId: 'B', otherEntriesMonth: 4, otherBranchEntriesThisMonth: 4 }, S).reason!, /4 entradas/);
    assert.match(evaluateAccess({ ...base, hoursFrom: 6, hoursTo: 10, nowMinutes: 11 * 60 }, S).reason!, /06:00 às 10:00/);
    assert.match(evaluateAccess({ ...base, minutesSinceLastEntry: 2 }, S).reason!, /Já entrou há 2 min/);
    assert.equal(evaluateAccess({ ...base, inside: 120 }, S).reason, 'Lotação máxima atingida.');
    assert.match(evaluateAccess({ ...base, status: 'em_divida', days: -3 }, S).warning!, /atraso há 3 dias/);
  });
});
