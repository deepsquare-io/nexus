import { ApolloServer } from '@apollo/server';
import createSchema from '@graphql/internal/createSchema';
import env from '@lib/app/env';

const createServer = () => {
  return new ApolloServer({
    schema: createSchema(),
    introspection: env.NEXT_PUBLIC_APP_ENV !== 'production',
  });
};

export default createServer;
