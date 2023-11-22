export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: string; output: string };
  Time: { input: string; output: string };
};

export type CpuTimeMetrics = {
  /** Total CPU*time used in jobs. (CPU.minutes) */
  total: Scalars['Float']['output'];
};

export type CreditsMetrics = {
  /** Total credits used in jobs. */
  spentTotal: Scalars['Float']['output'];
};

export type GpuTimeMetrics = {
  /** Total GPU*time used in jobs. (GPU.minutes) */
  total: Scalars['Float']['output'];
};

export type Job = {
  cost: JobCost;
  customerAddr: Scalars['String']['output'];
  definition: JobDefinition;
  hasCancelRequest: Scalars['Boolean']['output'];
  jobId: Scalars['String']['output'];
  jobName: Scalars['String']['output'];
  providerAddr: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  time: JobTime;
  valid: Scalars['Boolean']['output'];
};

export type JobCost = {
  delegateSpendingAuthority: Scalars['Boolean']['output'];
  finalCost: Scalars['BigInt']['output'];
  maxCost: Scalars['BigInt']['output'];
  pendingTopUp: Scalars['BigInt']['output'];
};

export type JobDefinition = {
  cpuPerTask: Scalars['Int']['output'];
  gpuPerTask: Scalars['Int']['output'];
  memPerCpu: Scalars['Int']['output'];
  ntasks: Scalars['Int']['output'];
};

export type JobDurationMetrics = {
  /** Average of non-zero values duration over a period of time. */
  average: Scalars['Float']['output'];
  /** Max duration over a period of time. */
  max: Scalars['Float']['output'];
};

export type JobDurationMetricsAverageArgs = {
  days: Scalars['Int']['input'];
};

export type JobDurationMetricsMaxArgs = {
  days: Scalars['Int']['input'];
};

export type JobMetrics = {
  duration?: Maybe<JobDurationMetrics>;
  /**
   * Moving rate between two time.
   *
   * Take the latest point of [endTime] to get the rate of jobs of the last [days].
   *
   * [days] also determine the resolution.
   *
   * The time parameters take a UNIX timestamp in seconds.
   *
   * Example: If endTime = now, startTime = now, days = 30d, you get the number of jobs that was submitted the last 30d.
   *
   * Example 2: If endTime = 01-01-2022, startTime = 01-01-2021, days = 30d, you get 12 points which indicates the number of jobs that was submitted each month of 2022.
   */
  rateRange: Array<TimestampValue>;
  /** Total jobs submitted. */
  total: Scalars['Float']['output'];
};

export type JobMetricsRateRangeArgs = {
  days: Scalars['Int']['input'];
  endTime: Scalars['Time']['input'];
  startTime: Scalars['Time']['input'];
};

export type JobTime = {
  blockNumberStateChange: Scalars['BigInt']['output'];
  cancelRequestTimestamp: Scalars['BigInt']['output'];
  end: Scalars['BigInt']['output'];
  start: Scalars['BigInt']['output'];
};

export type Metric = {
  key: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Query = {
  cpuTimeMetrics: CpuTimeMetrics;
  creditsMetrics: CreditsMetrics;
  gpuTimeMetrics: GpuTimeMetrics;
  jobMetrics: JobMetrics;
  walletMetrics: WalletMetrics;
};

export type Subscription = {
  job: Job;
};

export type TimestampValue = {
  /** Unix timestamp in seconds. */
  timestamp: Scalars['Int']['output'];
  value: Scalars['Float']['output'];
};

export type WalletMetrics = {
  /** Number of unique wallets that submitted jobs. */
  count: Scalars['Int']['output'];
  /** Best wallets that submitted jobs. */
  top10: Array<Metric>;
};

export type WalletMetricsTop10Args = {
  orderBy: WalletOrderBy;
};

export enum WalletOrderBy {
  CREDIT_SPENT = 'CREDIT_SPENT',
  JOBS_SUBMITTED = 'JOBS_SUBMITTED',
}
