export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: string;
  Time: string;
};

export type CpuTimeMetrics = {
  /** Total CPU*time used in jobs. (CPU.minutes) */
  total: Scalars['Float'];
};

export type CreditsMetrics = {
  /** Total credits used in jobs. */
  spentTotal: Scalars['Float'];
};

export type GpuTimeMetrics = {
  /** Total GPU*time used in jobs. (GPU.minutes) */
  total: Scalars['Float'];
};

export type Job = {
  cost: JobCost;
  customerAddr: Scalars['String'];
  definition: JobDefinition;
  hasCancelRequest: Scalars['Boolean'];
  jobId: Scalars['String'];
  jobName: Scalars['String'];
  providerAddr: Scalars['String'];
  status: Scalars['Int'];
  time: JobTime;
  valid: Scalars['Boolean'];
};

export type JobCost = {
  delegateSpendingAuthority: Scalars['Boolean'];
  finalCost: Scalars['BigInt'];
  maxCost: Scalars['BigInt'];
  pendingTopUp: Scalars['BigInt'];
};

export type JobDefinition = {
  cpuPerTask: Scalars['Int'];
  gpuPerTask: Scalars['Int'];
  memPerCpu: Scalars['Int'];
  ntasks: Scalars['Int'];
};

export type JobDurationMetrics = {
  /** Average of non-zero values duration over a period of time. */
  average: Scalars['Float'];
  /** Max duration over a period of time. */
  max: Scalars['Float'];
};

export type JobDurationMetricsAverageArgs = {
  days: Scalars['Int'];
};

export type JobDurationMetricsMaxArgs = {
  days: Scalars['Int'];
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
  total: Scalars['Float'];
};

export type JobMetricsRateRangeArgs = {
  days: Scalars['Int'];
  endTime: Scalars['Time'];
  startTime: Scalars['Time'];
};

export type JobTime = {
  blockNumberStateChange: Scalars['BigInt'];
  cancelRequestTimestamp: Scalars['BigInt'];
  end: Scalars['BigInt'];
  start: Scalars['BigInt'];
};

export type Metric = {
  key: Scalars['String'];
  value: Scalars['Float'];
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
  timestamp: Scalars['Int'];
  value: Scalars['Float'];
};

export type WalletMetrics = {
  /** Number of unique wallets that submitted jobs. */
  count: Scalars['Int'];
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
