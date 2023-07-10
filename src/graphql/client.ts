import { toast } from 'react-toastify';
import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import env from '@lib/app/env';
import { isPlatformServer } from '@utils/platform';

const apiLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_APP_URL}/graphql`,
});

const sbatchServiceLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
});

const statsLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_STATS_API_URL}/graphql`,
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      toast.error(error.message, { autoClose: false });
    }
  }
});

const client = new ApolloClient({
  ssrMode: isPlatformServer(),
  link: from([
    errorLink,
    split(
      (operation) => operation.getContext().clientName === 'stats',
      statsLink,
      split((operation) => operation.getContext().clientName === 'sbatch', sbatchServiceLink, apiLink),
    ),
  ]),
  cache: new InMemoryCache(),
});

export default client;
