import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Role } from './context.js';

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url');

export type AccessClaims = { sub: string; org: string; roles: Role[]; br: string[] | null; mem: string | null; iat: number; exp: number };

/** Token de acesso JWT (HS256), curto (RNF-04). */
export function signAccess(claims: Omit<AccessClaims, 'iat' | 'exp'>, secret: string, minutes: number, now = Date.now()): string {
  const iat = Math.floor(now / 1000);
  const body = { ...claims, iat, exp: iat + minutes * 60 };
  const head = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64(JSON.stringify(body));
  const sig = createHmac('sha256', secret).update(`${head}.${payload}`).digest('base64url');
  return `${head}.${payload}.${sig}`;
}

export function verifyAccess(token: string, secret: string, now = Date.now()): AccessClaims | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [head, payload, sig] = parts as [string, string, string];
  const expected = createHmac('sha256', secret).update(`${head}.${payload}`).digest();
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const h = JSON.parse(Buffer.from(head, 'base64url').toString());
    if (h.alg !== 'HS256') return null;
    const c = JSON.parse(Buffer.from(payload, 'base64url').toString()) as AccessClaims;
    if (typeof c.exp !== 'number' || c.exp * 1000 <= now) return null;
    return c;
  } catch {
    return null;
  }
}

/** Token de renovação: opaco, guardado só como hash (RNF-04). */
export const newRefreshToken = () => randomBytes(32).toString('base64url');
export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');
