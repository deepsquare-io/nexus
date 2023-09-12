// import type Context from '@graphql/context/Context';
import type { JWTPayload } from 'jose';
import type { NextRequest } from 'next/server';
import type Context from '@graphql/internal/context/Context';
import { AuthenticationError } from '@graphql/internal/errors/AuthenticationError';
import verify from '@lib/auth/verify';

export default async function JwtContext(req: NextRequest): Promise<Context> {
  const ctx: Context = { req, jwt: undefined, user: null };

  let raw: string;
  const authFromHeader = req.headers.get('authorization');

  // Allow authenticating from cookies
  if (authFromHeader !== null) {
    raw = authFromHeader;
  }
  // No token
  else {
    ctx.jwt = undefined;
    return ctx;
  }

  const jwt = raw.trim().replace(/^Bearer /, ''); // Trim the `Bearer ` prefix

  try {
    ctx.jwt = await verify<
      JWTPayload & {
        type: 'web2' | 'web3';
      }
    >(jwt);
  } catch (e) {
    throw new AuthenticationError('Your session has expired');
  }

  return ctx;
}
