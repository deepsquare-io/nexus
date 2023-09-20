import type { JWTPayload } from 'jose';
import { importSPKI, jwtVerify } from 'jose';
import { z } from 'zod';
import env from '@lib/app/env';
import { JWT_ALG } from '@lib/auth/constants';

export default async function verify<
  T extends JWTPayload = JWTPayload & {
    type: 'web2' | 'web3';
  },
>(jwt: string): Promise<T> {
  const publicKeyBase64 = z.string().parse(env.NEXT_PUBLIC_JWT_PUBLIC_KEY);
  const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');
  return (await jwtVerify(jwt, await importSPKI(publicKey, JWT_ALG))).payload as T;
}
