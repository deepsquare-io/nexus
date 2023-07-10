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
  Hex: any;
  bigint: string;
};

export type BoreInput = {
  address: Scalars['String'];
  port: Scalars['Int'];
  targetPort: Scalars['Int'];
};

export type ContainerRunInput = {
  apptainer?: InputMaybe<Scalars['Boolean']>;
  deepsquareHosted?: InputMaybe<Scalars['Boolean']>;
  image: Scalars['String'];
  mounts?: InputMaybe<Array<MountInput>>;
  password?: InputMaybe<Scalars['String']>;
  registry?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  x11?: InputMaybe<Scalars['Boolean']>;
};

export type EnvVarInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type ForRangeInput = {
  begin: Scalars['Int'];
  end: Scalars['Int'];
  increment?: InputMaybe<Scalars['Int']>;
};

export type FullJobSummary = {
  cost: JobCost;
  customerAddr: Scalars['Hex'];
  definition: JobDefinition;
  hasCancelRequest: Scalars['Boolean'];
  jobId: Scalars['Hex'];
  jobName: Scalars['Hex'];
  provider: Provider;
  providerAddr: Scalars['Hex'];
  status: JobStatus;
  time: JobTime;
  valid: Scalars['Boolean'];
};

export type GetJobHashOutput = {
  address: Scalars['Hex'];
  hash: Scalars['Hex'];
  timestamp: Scalars['String'];
};

export type HttpDataInput = {
  url: Scalars['String'];
};

export type JobCost = {
  delegateSpendingAuthority: Scalars['Boolean'];
  finalCost: Scalars['bigint'];
  maxCost: Scalars['bigint'];
  pendingTopUp: Scalars['bigint'];
};

export type JobDefinition = {
  batchLocationHash: Scalars['String'];
  cpuPerTask: Scalars['bigint'];
  gpuPerTask: Scalars['bigint'];
  memPerCpu: Scalars['bigint'];
  ntasks: Scalars['bigint'];
  storageType: Scalars['Int'];
  uses: Array<Label>;
};

export type JobInput = {
  continuousOutputSync?: InputMaybe<Scalars['Boolean']>;
  enableLogging?: InputMaybe<Scalars['Boolean']>;
  env?: InputMaybe<Array<EnvVarInput>>;
  input?: InputMaybe<TransportDataInput>;
  inputMode?: InputMaybe<Scalars['Int']>;
  output?: InputMaybe<TransportDataInput>;
  resources: JobResourcesInput;
  steps: Array<StepInput>;
};

export type JobResourcesInput = {
  cpusPerTask: Scalars['Int'];
  gpusPerTask: Scalars['Int'];
  memPerCpu: Scalars['Int'];
  tasks: Scalars['Int'];
};

export enum JobStatus {
  CANCELLED = 0,
  FAILED = 1,
  FINISHED = 2,
  META_SCHEDULED = 3,
  OUT_OF_CREDITS = 4,
  PENDING = 5,
  RUNNING = 6,
  SCHEDULED = 7,
}

export type JobTime = {
  blockNumberStateChange: Scalars['bigint'];
  cancelRequestTimestamp: Scalars['bigint'];
  end: Scalars['bigint'];
  start: Scalars['bigint'];
};

export type Label = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type MountInput = {
  containerDir: Scalars['String'];
  hostDir: Scalars['String'];
  options: Scalars['String'];
};

export type Mutation = {
  requestJob: Scalars['Boolean'];
};

export type MutationRequestJobArgs = {
  job: JobInput;
  jobName: Scalars['String'];
  maxAmount: Scalars['String'];
};

export type NetworkInterfaceInput = {
  bore?: InputMaybe<BoreInput>;
  wireguard?: InputMaybe<WireguardInput>;
};

export type Provider = {
  addr: Scalars['Hex'];
  jobCount: Scalars['bigint'];
  linkListed: Scalars['Boolean'];
  providerHardware: ProviderHardware;
  providerPrices: ProviderPrices;
  status: ProviderStatus;
  valid: Scalars['Boolean'];
};

export type ProviderHardware = {
  cpus: Scalars['bigint'];
  gpus: Scalars['bigint'];
  mem: Scalars['bigint'];
  nodes: Scalars['bigint'];
};

export type ProviderPrices = {
  cpuPricePerMin: Scalars['bigint'];
  gpuPricePerMin: Scalars['bigint'];
  memPricePerMin: Scalars['bigint'];
};

export enum ProviderStatus {
  BANNED = 0,
  JOINED = 1,
  KICKED = 2,
  UNKNOWN = 3,
  WAITING_APPROVAL = 4,
}

export type Query = {
  getJobHash: GetJobHashOutput;
  listJobs: Array<FullJobSummary>;
  ping: Scalars['String'];
};

export type QueryGetJobHashArgs = {
  jobId: Scalars['Hex'];
};

export type QueryPingArgs = {
  pong?: InputMaybe<Scalars['String']>;
};

export type S3DataInput = {
  accessKeyId: Scalars['String'];
  bucketUrl: Scalars['String'];
  deleteSync?: InputMaybe<Scalars['Boolean']>;
  endpointUrl: Scalars['String'];
  path: Scalars['String'];
  region: Scalars['String'];
  secretAccessKey: Scalars['String'];
};

export type StepAsyncLaunchInput = {
  handleName?: InputMaybe<Scalars['String']>;
  signalOnParentStepExit?: InputMaybe<Scalars['Int']>;
  steps: Array<StepInput>;
};

export type StepForInput = {
  items?: InputMaybe<Array<Scalars['String']>>;
  parallel: Scalars['Boolean'];
  range?: InputMaybe<ForRangeInput>;
  steps: Array<StepInput>;
};

export type StepInput = {
  dependsOn?: InputMaybe<Array<Scalars['String']>>;
  for?: InputMaybe<StepForInput>;
  launch?: InputMaybe<StepAsyncLaunchInput>;
  name?: InputMaybe<Scalars['String']>;
  run?: InputMaybe<StepRunInput>;
  use?: InputMaybe<StepUseInput>;
};

export type StepRunInput = {
  command: Scalars['String'];
  container?: InputMaybe<ContainerRunInput>;
  customNetworkInterfaces?: InputMaybe<Array<NetworkInterfaceInput>>;
  disableCpuBinding?: InputMaybe<Scalars['Boolean']>;
  dns?: InputMaybe<Array<Scalars['String']>>;
  env?: InputMaybe<Array<EnvVarInput>>;
  mapRoot?: InputMaybe<Scalars['Boolean']>;
  mpi?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Scalars['String']>;
  resources?: InputMaybe<StepRunResourcesInput>;
  shell?: InputMaybe<Scalars['String']>;
  workDir?: InputMaybe<Scalars['String']>;
};

export type StepRunResourcesInput = {
  cpusPerTask?: InputMaybe<Scalars['Int']>;
  gpusPerTask?: InputMaybe<Scalars['Int']>;
  memPerCpu?: InputMaybe<Scalars['Int']>;
  tasks?: InputMaybe<Scalars['Int']>;
};

export type StepUseInput = {
  args?: InputMaybe<Array<EnvVarInput>>;
  exportEnvAs?: InputMaybe<Scalars['String']>;
  source: Scalars['String'];
};

export type TransportDataInput = {
  http?: InputMaybe<HttpDataInput>;
  s3?: InputMaybe<S3DataInput>;
};

export type WireguardInput = {
  address?: InputMaybe<Array<Scalars['String']>>;
  peers?: InputMaybe<Array<WireguardPeerInput>>;
  privateKey: Scalars['String'];
};

export type WireguardPeerInput = {
  allowedIPs?: InputMaybe<Array<Scalars['String']>>;
  endpoint?: InputMaybe<Scalars['String']>;
  persistentKeepalive?: InputMaybe<Scalars['Int']>;
  preSharedKey?: InputMaybe<Scalars['String']>;
  publicKey: Scalars['String'];
};
