import { createParamDecorator } from 'type-graphql';
import withUser from '@graphql/internal/context/withUser';
import { AuthenticationError } from '@graphql/internal/errors/AuthenticationError';
import type Context from '../Context';

const Auth = createParamDecorator<Context>(async ({ context }) => {
  if (!context.jwt) {
    throw new AuthenticationError('Authentication required.');
  }

  await withUser(context);

  return context.user;
});

export default Auth;
