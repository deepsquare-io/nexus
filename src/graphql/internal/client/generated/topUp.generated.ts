import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type TopUpMutationVariables = Types.Exact<{
  jobId: Types.Scalars['Hex'];
  amount: Types.Scalars['String'];
}>;

export type TopUpMutation = { topUp: boolean };

export const TopUpDocument = /*#__PURE__*/ gql`
  mutation TopUp($jobId: Hex!, $amount: String!) {
    topUp(jobId: $jobId, amount: $amount)
  }
`;
export type TopUpMutationFn = Apollo.MutationFunction<TopUpMutation, TopUpMutationVariables>;

/**
 * __useTopUpMutation__
 *
 * To run a mutation, you first call `useTopUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topUpMutation, { data, loading, error }] = useTopUpMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useTopUpMutation(baseOptions?: Apollo.MutationHookOptions<TopUpMutation, TopUpMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TopUpMutation, TopUpMutationVariables>(TopUpDocument, options);
}
export type TopUpMutationHookResult = ReturnType<typeof useTopUpMutation>;
export type TopUpMutationResult = Apollo.MutationResult<TopUpMutation>;
export type TopUpMutationOptions = Apollo.BaseMutationOptions<TopUpMutation, TopUpMutationVariables>;
