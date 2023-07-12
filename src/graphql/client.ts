// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
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
