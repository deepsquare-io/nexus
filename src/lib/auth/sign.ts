import type { SignOptions } from 'jsonwebtoken';
import { sign as signJWT } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { z } from 'zod';
import env from '@lib/app/env';
import { JWT_ALG, JWT_ISS } from '@lib/auth/constants';

export function sign(
  payload: string | object | Buffer,
  options?: Omit<SignOptions, 'algorithm' | 'issuer' | 'jwtid'>,
): string {
  const privateKeyBase64 = z.string().parse(env.JWT_PRIVATE_KEY);
  const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

  return signJWT(payload, privateKey, {
    algorithm: JWT_ALG,
    jwtid: v4(),
    issuer: JWT_ISS,
    ...options,
  });
}
