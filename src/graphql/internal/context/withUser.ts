import type Context from '@graphql/internal/context/Context';
import { AuthenticationError } from '@graphql/internal/errors/AuthenticationError';
import type { User } from '../../../database/User/User';
import UserModel from '../../../database/User/UserModel';

type ContextWithUser = Omit<Context, 'user'> & { user: User };

function hasUser(context: Context): context is ContextWithUser {
  return !!context.user;
}

export default async function withUser(context: Context): Promise<ContextWithUser> {
  if (!context.jwt) {
    throw new AuthenticationError('Authentication required.');
  }

  if (hasUser(context)) {
    return context;
  }

  if (!context.jwt.sub) throw new AuthenticationError('Authentication required.');

  if (context.jwt.sub.startsWith('0x')) {
    context.user = { _id: context.jwt.sub, jobs: [] };
  } else {
    context.user = await UserModel.findById(context.jwt.sub).lean().exec();
  }

  if (!hasUser(context)) {
    throw new AuthenticationError('Authentication failed.');
  }

  return context;
}
