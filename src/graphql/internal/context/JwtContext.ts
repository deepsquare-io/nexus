// import type Context from '@graphql/context/Context';
import type Context from '@graphql/internal/context/Context';
import { AuthenticationError } from '@graphql/internal/errors/AuthenticationError';
import verify from '@lib/auth/verify';
import { JWT_STORAGE_KEY } from '@lib/constants';

export default function JwtContext(ctx: Context): Context {
  let raw: string;

  // Allow authenticating from cookies
  if (typeof ctx.req.headers.authorization === 'string') {
    raw = ctx.req.headers.authorization;
  }
  // Allow authenticating from authorization header
  else if (typeof ctx.req.cookies[JWT_STORAGE_KEY] === 'string') {
    raw = ctx.req.cookies[JWT_STORAGE_KEY];
  }
  // No token
  else {
    ctx.jwt = null;
    return ctx;
  }

  const jwt = raw.trim().replace(/^Bearer /, ''); // Trim the `Bearer ` prefix

  try {
    ctx.jwt = verify<{ sub: string }>(jwt);
  } catch (e) {
    ctx.res.setHeader(
      'Set-Cookie',
      `${JWT_STORAGE_KEY}=; HttpOnly; Secure; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    );
    throw new AuthenticationError('Your session has expired');
  }

  return ctx;
}
