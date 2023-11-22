import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type ListJobQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ListJobQuery = { listJobs: Array<string> };

export const ListJobDocument = /*#__PURE__*/ gql`
  query ListJob {
    listJobs
  }
`;

/**
 * __useListJobQuery__
 *
 * To run a query within a React component, call `useListJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useListJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListJobQuery({
 *   variables: {
 *   },
 * });
 */
export function useListJobQuery(baseOptions?: Apollo.QueryHookOptions<ListJobQuery, ListJobQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListJobQuery, ListJobQueryVariables>(ListJobDocument, options);
}
export function useListJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListJobQuery, ListJobQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListJobQuery, ListJobQueryVariables>(ListJobDocument, options);
}
export function useListJobSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ListJobQuery, ListJobQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ListJobQuery, ListJobQueryVariables>(ListJobDocument, options);
}
export type ListJobQueryHookResult = ReturnType<typeof useListJobQuery>;
export type ListJobLazyQueryHookResult = ReturnType<typeof useListJobLazyQuery>;
export type ListJobSuspenseQueryHookResult = ReturnType<typeof useListJobSuspenseQuery>;
export type ListJobQueryResult = Apollo.QueryResult<ListJobQuery, ListJobQueryVariables>;
export function refetchListJobQuery(variables?: ListJobQueryVariables) {
  return { query: ListJobDocument, variables: variables };
}
