import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type GetWorkflowQueryVariables = Types.Exact<{
  workflowId: Types.Scalars['String'];
}>;

export type GetWorkflowQuery = { getWorkflow?: { _id: string; userId: string; content: string } | null };

export const GetWorkflowDocument = /*#__PURE__*/ gql`
  query GetWorkflow($workflowId: String!) {
    getWorkflow(workflowId: $workflowId) {
      _id
      userId
      content
    }
  }
`;

/**
 * __useGetWorkflowQuery__
 *
 * To run a query within a React component, call `useGetWorkflowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowQuery({
 *   variables: {
 *      workflowId: // value for 'workflowId'
 *   },
 * });
 */
export function useGetWorkflowQuery(baseOptions: Apollo.QueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
}
export function useGetWorkflowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
}
export type GetWorkflowQueryHookResult = ReturnType<typeof useGetWorkflowQuery>;
export type GetWorkflowLazyQueryHookResult = ReturnType<typeof useGetWorkflowLazyQuery>;
export type GetWorkflowQueryResult = Apollo.QueryResult<GetWorkflowQuery, GetWorkflowQueryVariables>;
export function refetchGetWorkflowQuery(variables: GetWorkflowQueryVariables) {
  return { query: GetWorkflowDocument, variables: variables };
}
