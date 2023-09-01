import type { VerifyOptions } from 'jsonwebtoken';
import { verify as verifyJWT } from 'jsonwebtoken';
import { z } from 'zod';
import env from '@lib/app/env';
import { JWT_ALG } from '@lib/auth/constants';

export default function verify(jwt: string, options?: Omit<VerifyOptions, 'algorithms' | 'issuer'>) {
  const publicKeyBase64 = z.string().parse(env.NEXT_PUBLIC_JWT_PUBLIC_KEY);
  const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');
  console.log('test');
  return verifyJWT(jwt, publicKey, {
    algorithms: [JWT_ALG],
    ...options,
  });
}
