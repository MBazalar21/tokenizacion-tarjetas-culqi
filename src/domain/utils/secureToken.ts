import crypto from 'crypto';
import dotenv from 'dotenv';
import { toBase62,fromBase62 } from './base62';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY!;

const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function toBase62Buffer(buffer: Buffer): string {
  let num = BigInt('0x' + buffer.toString('hex'));
  let result = '';
  while (num > 0) {
    const rem = num % 62n;
    result = base62Chars[Number(rem)] + result;
    num = num / 62n;
  }
  return result.padStart(16, '0').slice(0, 16); // siempre 16 caracteres
}


export function generateSecureToken(durationMinutes = 15): string {
  const expiresAt = Math.floor(Date.now() / 1000) + durationMinutes * 60;
  const expiresEncoded = toBase62(expiresAt).padStart(6, '0'); // para que tenga tamaño fijo

  const hmac = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(expiresEncoded)
    .digest();

  const signature = toBase62Buffer(hmac).slice(0, 10); // Solo los primeros 10 caracteres

  return `${expiresEncoded}${signature}`; // Total: 16 caracteres
}


export function validateToken(token: string, toleranceSeconds = 60, durationMinutes = 15): boolean {
   if (token.length !== 16) return false;

  const expiresEncoded = token.slice(0, 6);
  const signature = token.slice(6);

  // Asegúrate que esto sea un string (no number)
  const expectedHmac = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(expiresEncoded) // << esta línea no debe usar `fromBase62`
    .digest();

  const expectedSignature = toBase62Buffer(expectedHmac).slice(0, 10);

  if (signature !== expectedSignature) return false;

  const expiresAt = fromBase62(expiresEncoded);
  const now = Math.floor(Date.now() / 1000);

  return now <= expiresAt;
}
