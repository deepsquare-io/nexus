import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type RequestJobMutationVariables = Types.Exact<{
  job: Types.JobInput;
  jobName: Types.Scalars['String'];
  maxAmount: Types.Scalars['String'];
  userId: Types.Scalars['String'];
  labels: Array<Types.LabelInput> | Types.LabelInput;
}>;

export type RequestJobMutation = { requestJob: boolean };

export const RequestJobDocument = /*#__PURE__*/ gql`
  mutation RequestJob(
    $job: JobInput!
    $jobName: String!
    $maxAmount: String!
    $userId: String!
    $labels: [LabelInput!]!
  ) {
    requestJob(job: $job, jobName: $jobName, maxAmount: $maxAmount, userId: $userId, labels: $labels)
  }
`;
export type RequestJobMutationFn = Apollo.MutationFunction<RequestJobMutation, RequestJobMutationVariables>;

/**
 * __useRequestJobMutation__
 *
 * To run a mutation, you first call `useRequestJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestJobMutation, { data, loading, error }] = useRequestJobMutation({
 *   variables: {
 *      job: // value for 'job'
 *      jobName: // value for 'jobName'
 *      maxAmount: // value for 'maxAmount'
 *      userId: // value for 'userId'
 *      labels: // value for 'labels'
 *   },
 * });
 */
export function useRequestJobMutation(
  baseOptions?: Apollo.MutationHookOptions<RequestJobMutation, RequestJobMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RequestJobMutation, RequestJobMutationVariables>(RequestJobDocument, options);
}
export type RequestJobMutationHookResult = ReturnType<typeof useRequestJobMutation>;
export type RequestJobMutationResult = Apollo.MutationResult<RequestJobMutation>;
export type RequestJobMutationOptions = Apollo.BaseMutationOptions<RequestJobMutation, RequestJobMutationVariables>;
