import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type LoginFromWeb2MutationVariables = Types.Exact<{
  firebaseToken: Types.Scalars['String'];
}>;

export type LoginFromWeb2Mutation = { loginFromWeb2: string };

export const LoginFromWeb2Document = /*#__PURE__*/ gql`
  mutation LoginFromWeb2($firebaseToken: String!) {
    loginFromWeb2(firebaseToken: $firebaseToken)
  }
`;
export type LoginFromWeb2MutationFn = Apollo.MutationFunction<LoginFromWeb2Mutation, LoginFromWeb2MutationVariables>;

/**
 * __useLoginFromWeb2Mutation__
 *
 * To run a mutation, you first call `useLoginFromWeb2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFromWeb2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFromWeb2Mutation, { data, loading, error }] = useLoginFromWeb2Mutation({
 *   variables: {
 *      firebaseToken: // value for 'firebaseToken'
 *   },
 * });
 */
export function useLoginFromWeb2Mutation(
  baseOptions?: Apollo.MutationHookOptions<LoginFromWeb2Mutation, LoginFromWeb2MutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginFromWeb2Mutation, LoginFromWeb2MutationVariables>(LoginFromWeb2Document, options);
}
export type LoginFromWeb2MutationHookResult = ReturnType<typeof useLoginFromWeb2Mutation>;
export type LoginFromWeb2MutationResult = Apollo.MutationResult<LoginFromWeb2Mutation>;
export type LoginFromWeb2MutationOptions = Apollo.BaseMutationOptions<
  LoginFromWeb2Mutation,
  LoginFromWeb2MutationVariables
>;
