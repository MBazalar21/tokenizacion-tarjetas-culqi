import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

export function validateToken(token: string, storedHmac: string): boolean {
  const recalculatedHmac = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(token)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(recalculatedHmac, 'hex'),
    Buffer.from(storedHmac, 'hex')
  );
}
