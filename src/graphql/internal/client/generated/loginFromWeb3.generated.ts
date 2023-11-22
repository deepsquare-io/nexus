import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type LoginFromWeb3MutationVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  signature: Types.Scalars['String']['input'];
}>;

export type LoginFromWeb3Mutation = { loginFromWeb3: string };

export const LoginFromWeb3Document = /*#__PURE__*/ gql`
  mutation LoginFromWeb3($address: String!, $signature: String!) {
    loginFromWeb3(address: $address, signature: $signature)
  }
`;
export type LoginFromWeb3MutationFn = Apollo.MutationFunction<LoginFromWeb3Mutation, LoginFromWeb3MutationVariables>;

/**
 * __useLoginFromWeb3Mutation__
 *
 * To run a mutation, you first call `useLoginFromWeb3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFromWeb3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFromWeb3Mutation, { data, loading, error }] = useLoginFromWeb3Mutation({
 *   variables: {
 *      address: // value for 'address'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useLoginFromWeb3Mutation(
  baseOptions?: Apollo.MutationHookOptions<LoginFromWeb3Mutation, LoginFromWeb3MutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginFromWeb3Mutation, LoginFromWeb3MutationVariables>(LoginFromWeb3Document, options);
}
export type LoginFromWeb3MutationHookResult = ReturnType<typeof useLoginFromWeb3Mutation>;
export type LoginFromWeb3MutationResult = Apollo.MutationResult<LoginFromWeb3Mutation>;
export type LoginFromWeb3MutationOptions = Apollo.BaseMutationOptions<
  LoginFromWeb3Mutation,
  LoginFromWeb3MutationVariables
>;
