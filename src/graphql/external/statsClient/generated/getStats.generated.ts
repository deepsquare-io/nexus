import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type * as Types from './Types';

const defaultOptions = {} as const;
export type GetStatsQueryVariables = Types.Exact<{
  days: Types.Scalars['Int'];
  startTime: Types.Scalars['Time'];
  endTime: Types.Scalars['Time'];
  orderBy: Types.WalletOrderBy;
}>;

export type GetStatsQuery = {
  cpuTimeMetrics: { total: number };
  gpuTimeMetrics: { total: number };
  creditsMetrics: { spentTotal: number };
  jobMetrics: {
    total: number;
    duration?: { average: number; max: number } | null;
    rateRange: Array<{ timestamp: number; value: number }>;
  };
  walletMetrics: { count: number; top10: Array<{ key: string; value: number }> };
};

export const GetStatsDocument = /*#__PURE__*/ gql`
  query GetStats($days: Int!, $startTime: Time!, $endTime: Time!, $orderBy: WalletOrderBy!) {
    cpuTimeMetrics {
      total
    }
    gpuTimeMetrics {
      total
    }
    creditsMetrics {
      spentTotal
    }
    jobMetrics {
      duration {
        average(days: $days)
        max(days: $days)
      }
      rateRange(days: $days, startTime: $startTime, endTime: $endTime) {
        timestamp
        value
      }
      total
    }
    walletMetrics {
      count
      top10(orderBy: $orderBy) {
        key
        value
      }
    }
  }
`;

/**
 * __useGetStatsQuery__
 *
 * To run a query within a React component, call `useGetStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsQuery({
 *   variables: {
 *      days: // value for 'days'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetStatsQuery(baseOptions: Apollo.QueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
}
export function useGetStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
}
export type GetStatsQueryHookResult = ReturnType<typeof useGetStatsQuery>;
export type GetStatsLazyQueryHookResult = ReturnType<typeof useGetStatsLazyQuery>;
export type GetStatsQueryResult = Apollo.QueryResult<GetStatsQuery, GetStatsQueryVariables>;
export function refetchGetStatsQuery(variables: GetStatsQueryVariables) {
  return { query: GetStatsDocument, variables: variables };
}
