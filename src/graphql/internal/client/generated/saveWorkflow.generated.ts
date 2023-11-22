import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type SaveWorkflowMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
  workflowId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type SaveWorkflowMutation = { saveWorkflow: boolean };

export const SaveWorkflowDocument = /*#__PURE__*/ gql`
  mutation SaveWorkflow($name: String!, $content: String!, $workflowId: String) {
    saveWorkflow(name: $name, content: $content, workflowId: $workflowId)
  }
`;
export type SaveWorkflowMutationFn = Apollo.MutationFunction<SaveWorkflowMutation, SaveWorkflowMutationVariables>;

/**
 * __useSaveWorkflowMutation__
 *
 * To run a mutation, you first call `useSaveWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkflowMutation, { data, loading, error }] = useSaveWorkflowMutation({
 *   variables: {
 *      name: // value for 'name'
 *      content: // value for 'content'
 *      workflowId: // value for 'workflowId'
 *   },
 * });
 */
export function useSaveWorkflowMutation(
  baseOptions?: Apollo.MutationHookOptions<SaveWorkflowMutation, SaveWorkflowMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveWorkflowMutation, SaveWorkflowMutationVariables>(SaveWorkflowDocument, options);
}
export type SaveWorkflowMutationHookResult = ReturnType<typeof useSaveWorkflowMutation>;
export type SaveWorkflowMutationResult = Apollo.MutationResult<SaveWorkflowMutation>;
export type SaveWorkflowMutationOptions = Apollo.BaseMutationOptions<
  SaveWorkflowMutation,
  SaveWorkflowMutationVariables
>;
