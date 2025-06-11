import dotenv from 'dotenv';
import crypto from 'crypto';
import { ISerializedToken } from '../../core/interfaces/access/ISerializedToken';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!; // cadena privada
const TOKEN_LENGTH = 16;

function generateReadableToken(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

export function generateSecureToken(durationMinutes = 15): ISerializedToken {
   // Generar token aleatorio base (12 bytes)
  const rawToken = generateReadableToken(TOKEN_LENGTH);
  // Crear firma con HMAC (no cifrado)
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(rawToken).digest('hex');

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  return {
    token: rawToken,        // Token firmado, seguro
    rawToken:hmac,     // Token base, por si lo quieres validar luego
    expiresAt
  };
}
