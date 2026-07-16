import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string) {
  const candidate = scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}

export function generateSessionToken() {
  return randomBytes(32).toString('hex');
}

export const SESSION_COOKIE = 'partner_session';
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
