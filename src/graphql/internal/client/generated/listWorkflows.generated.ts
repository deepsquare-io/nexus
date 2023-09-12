import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type ListWorkflowsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ListWorkflowsQuery = { listWorkflows: Array<{ _id: string; content: string }> };

export const ListWorkflowsDocument = /*#__PURE__*/ gql`
  query ListWorkflows {
    listWorkflows {
      _id
      content
    }
  }
`;

/**
 * __useListWorkflowsQuery__
 *
 * To run a query within a React component, call `useListWorkflowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListWorkflowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListWorkflowsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListWorkflowsQuery(
  baseOptions?: Apollo.QueryHookOptions<ListWorkflowsQuery, ListWorkflowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListWorkflowsQuery, ListWorkflowsQueryVariables>(ListWorkflowsDocument, options);
}
export function useListWorkflowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListWorkflowsQuery, ListWorkflowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListWorkflowsQuery, ListWorkflowsQueryVariables>(ListWorkflowsDocument, options);
}
export type ListWorkflowsQueryHookResult = ReturnType<typeof useListWorkflowsQuery>;
export type ListWorkflowsLazyQueryHookResult = ReturnType<typeof useListWorkflowsLazyQuery>;
export type ListWorkflowsQueryResult = Apollo.QueryResult<ListWorkflowsQuery, ListWorkflowsQueryVariables>;
export function refetchListWorkflowsQuery(variables?: ListWorkflowsQueryVariables) {
  return { query: ListWorkflowsDocument, variables: variables };
}
