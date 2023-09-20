import type { JWTPayload } from 'jose';
import { importPKCS8, SignJWT } from 'jose';
import { z } from 'zod';
import env from '@lib/app/env';
import { JWT_ALG, JWT_ISS } from '@lib/auth/constants';

export async function sign(payload: JWTPayload): Promise<string> {
  const privateKeyBase64 = z.string().parse(env.JWT_PRIVATE_KEY);
  const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setIssuer(JWT_ISS)
    .setExpirationTime('2w')
    .sign(await importPKCS8(privateKey, JWT_ALG));
}
