import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type CancelJobMutationVariables = Types.Exact<{
  jobId: Types.Scalars['Hex'];
}>;

export type CancelJobMutation = { cancelJob: boolean };

export const CancelJobDocument = /*#__PURE__*/ gql`
  mutation CancelJob($jobId: Hex!) {
    cancelJob(jobId: $jobId)
  }
`;
export type CancelJobMutationFn = Apollo.MutationFunction<CancelJobMutation, CancelJobMutationVariables>;

/**
 * __useCancelJobMutation__
 *
 * To run a mutation, you first call `useCancelJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelJobMutation, { data, loading, error }] = useCancelJobMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useCancelJobMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelJobMutation, CancelJobMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelJobMutation, CancelJobMutationVariables>(CancelJobDocument, options);
}
export type CancelJobMutationHookResult = ReturnType<typeof useCancelJobMutation>;
export type CancelJobMutationResult = Apollo.MutationResult<CancelJobMutation>;
export type CancelJobMutationOptions = Apollo.BaseMutationOptions<CancelJobMutation, CancelJobMutationVariables>;
