import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type SetWorkflowVisibilityMutationVariables = Types.Exact<{
  workflowId: Types.Scalars['String']['input'];
  isPublic: Types.Scalars['Boolean']['input'];
}>;

export type SetWorkflowVisibilityMutation = { setWorkflowVisibility: boolean };

export const SetWorkflowVisibilityDocument = /*#__PURE__*/ gql`
  mutation SetWorkflowVisibility($workflowId: String!, $isPublic: Boolean!) {
    setWorkflowVisibility(workflowId: $workflowId, isPublic: $isPublic)
  }
`;
export type SetWorkflowVisibilityMutationFn = Apollo.MutationFunction<
  SetWorkflowVisibilityMutation,
  SetWorkflowVisibilityMutationVariables
>;

/**
 * __useSetWorkflowVisibilityMutation__
 *
 * To run a mutation, you first call `useSetWorkflowVisibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetWorkflowVisibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setWorkflowVisibilityMutation, { data, loading, error }] = useSetWorkflowVisibilityMutation({
 *   variables: {
 *      workflowId: // value for 'workflowId'
 *      isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useSetWorkflowVisibilityMutation(
  baseOptions?: Apollo.MutationHookOptions<SetWorkflowVisibilityMutation, SetWorkflowVisibilityMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetWorkflowVisibilityMutation, SetWorkflowVisibilityMutationVariables>(
    SetWorkflowVisibilityDocument,
    options,
  );
}
export type SetWorkflowVisibilityMutationHookResult = ReturnType<typeof useSetWorkflowVisibilityMutation>;
export type SetWorkflowVisibilityMutationResult = Apollo.MutationResult<SetWorkflowVisibilityMutation>;
export type SetWorkflowVisibilityMutationOptions = Apollo.BaseMutationOptions<
  SetWorkflowVisibilityMutation,
  SetWorkflowVisibilityMutationVariables
>;
