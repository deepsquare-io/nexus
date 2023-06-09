import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type SubmitMutationVariables = Types.Exact<{
  job: Types.Job;
}>;

export type SubmitMutation = { submit: string };

export const SubmitDocument = /*#__PURE__*/ gql`
  mutation Submit($job: Job!) {
    submit(job: $job)
  }
`;
export type SubmitMutationFn = Apollo.MutationFunction<SubmitMutation, SubmitMutationVariables>;

/**
 * __useSubmitMutation__
 *
 * To run a mutation, you first call `useSubmitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitMutation, { data, loading, error }] = useSubmitMutation({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useSubmitMutation(baseOptions?: Apollo.MutationHookOptions<SubmitMutation, SubmitMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SubmitMutation, SubmitMutationVariables>(SubmitDocument, options);
}
export type SubmitMutationHookResult = ReturnType<typeof useSubmitMutation>;
export type SubmitMutationResult = Apollo.MutationResult<SubmitMutation>;
export type SubmitMutationOptions = Apollo.BaseMutationOptions<SubmitMutation, SubmitMutationVariables>;
