import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type PingQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PingQuery = { ping: string };

export const PingDocument = /*#__PURE__*/ gql`
  query Ping {
    ping
  }
`;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
}
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
}
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
export function refetchPingQuery(variables?: PingQueryVariables) {
  return { query: PingDocument, variables: variables };
}
