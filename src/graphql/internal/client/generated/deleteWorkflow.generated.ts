import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type DeleteWorkflowMutationVariables = Types.Exact<{
  workflowId: Types.Scalars['String']['input'];
}>;

export type DeleteWorkflowMutation = { deleteWorkflow: boolean };

export const DeleteWorkflowDocument = /*#__PURE__*/ gql`
  mutation DeleteWorkflow($workflowId: String!) {
    deleteWorkflow(workflowId: $workflowId)
  }
`;
export type DeleteWorkflowMutationFn = Apollo.MutationFunction<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>;

/**
 * __useDeleteWorkflowMutation__
 *
 * To run a mutation, you first call `useDeleteWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkflowMutation, { data, loading, error }] = useDeleteWorkflowMutation({
 *   variables: {
 *      workflowId: // value for 'workflowId'
 *   },
 * });
 */
export function useDeleteWorkflowMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>(DeleteWorkflowDocument, options);
}
export type DeleteWorkflowMutationHookResult = ReturnType<typeof useDeleteWorkflowMutation>;
export type DeleteWorkflowMutationResult = Apollo.MutationResult<DeleteWorkflowMutation>;
export type DeleteWorkflowMutationOptions = Apollo.BaseMutationOptions<
  DeleteWorkflowMutation,
  DeleteWorkflowMutationVariables
>;
