import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type GetJobHashQueryVariables = Types.Exact<{
  jobId: Types.Scalars['Hex'];
}>;

export type GetJobHashQuery = { getJobHash: { hash: any; address: any; timestamp: string } };

export const GetJobHashDocument = /*#__PURE__*/ gql`
  query GetJobHash($jobId: Hex!) {
    getJobHash(jobId: $jobId) {
      hash
      address
      timestamp
    }
  }
`;

/**
 * __useGetJobHashQuery__
 *
 * To run a query within a React component, call `useGetJobHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobHashQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetJobHashQuery(baseOptions: Apollo.QueryHookOptions<GetJobHashQuery, GetJobHashQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetJobHashQuery, GetJobHashQueryVariables>(GetJobHashDocument, options);
}
export function useGetJobHashLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetJobHashQuery, GetJobHashQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetJobHashQuery, GetJobHashQueryVariables>(GetJobHashDocument, options);
}
export type GetJobHashQueryHookResult = ReturnType<typeof useGetJobHashQuery>;
export type GetJobHashLazyQueryHookResult = ReturnType<typeof useGetJobHashLazyQuery>;
export type GetJobHashQueryResult = Apollo.QueryResult<GetJobHashQuery, GetJobHashQueryVariables>;
export function refetchGetJobHashQuery(variables: GetJobHashQueryVariables) {
  return { query: GetJobHashDocument, variables: variables };
}
