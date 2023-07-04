import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type StartStreamJobLogsQueryVariables = Types.Exact<{
  jobId: Types.Scalars['Hex'];
}>;

export type StartStreamJobLogsQuery = { startStreamJobLogs: string };

export const StartStreamJobLogsDocument = /*#__PURE__*/ gql`
  query StartStreamJobLogs($jobId: Hex!) {
    startStreamJobLogs(jobId: $jobId)
  }
`;

/**
 * __useStartStreamJobLogsQuery__
 *
 * To run a query within a React component, call `useStartStreamJobLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartStreamJobLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartStreamJobLogsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useStartStreamJobLogsQuery(
  baseOptions: Apollo.QueryHookOptions<StartStreamJobLogsQuery, StartStreamJobLogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StartStreamJobLogsQuery, StartStreamJobLogsQueryVariables>(
    StartStreamJobLogsDocument,
    options,
  );
}
export function useStartStreamJobLogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StartStreamJobLogsQuery, StartStreamJobLogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StartStreamJobLogsQuery, StartStreamJobLogsQueryVariables>(
    StartStreamJobLogsDocument,
    options,
  );
}
export type StartStreamJobLogsQueryHookResult = ReturnType<typeof useStartStreamJobLogsQuery>;
export type StartStreamJobLogsLazyQueryHookResult = ReturnType<typeof useStartStreamJobLogsLazyQuery>;
export type StartStreamJobLogsQueryResult = Apollo.QueryResult<
  StartStreamJobLogsQuery,
  StartStreamJobLogsQueryVariables
>;
export function refetchStartStreamJobLogsQuery(variables: StartStreamJobLogsQueryVariables) {
  return { query: StartStreamJobLogsDocument, variables: variables };
}
