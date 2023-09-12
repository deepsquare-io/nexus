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

export type GetJobHashOutput = {
  address: Scalars['Hex'];
  hash: Scalars['Hex'];
  timestamp: Scalars['String'];
};

export type HttpDataInput = {
  url: Scalars['String'];
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

export type MountInput = {
  containerDir: Scalars['String'];
  hostDir: Scalars['String'];
  options: Scalars['String'];
};

export type Mutation = {
  cancelJob: Scalars['Boolean'];
  createUser: Scalars['Boolean'];
  deleteWorkflow: Scalars['Boolean'];
  loginFromWeb2: Scalars['String'];
  loginFromWeb3: Scalars['String'];
  requestJob: Scalars['Boolean'];
  saveWorkflow: Scalars['Boolean'];
};

export type MutationCancelJobArgs = {
  jobId: Scalars['Hex'];
};

export type MutationCreateUserArgs = {
  userId: Scalars['String'];
};

export type MutationDeleteWorkflowArgs = {
  workflowId: Scalars['String'];
};

export type MutationLoginFromWeb2Args = {
  firebaseToken: Scalars['String'];
};

export type MutationLoginFromWeb3Args = {
  address: Scalars['Hex'];
  signature: Scalars['Hex'];
};

export type MutationRequestJobArgs = {
  job: JobInput;
  jobName: Scalars['String'];
  maxAmount: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationSaveWorkflowArgs = {
  content: Scalars['String'];
  workflowId?: InputMaybe<Scalars['String']>;
};

export type NetworkInterfaceInput = {
  bore?: InputMaybe<BoreInput>;
  wireguard?: InputMaybe<WireguardInput>;
};

export type Node = {
  _id: Scalars['ID'];
};

export type Query = {
  getJobHash: GetJobHashOutput;
  getWorkflow?: Maybe<Workflow>;
  listJobs: Array<Scalars['Hex']>;
  listWorkflows: Array<Workflow>;
  ping: Scalars['String'];
};

export type QueryGetJobHashArgs = {
  jobId: Scalars['Hex'];
};

export type QueryGetWorkflowArgs = {
  workflowId: Scalars['String'];
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

export type Workflow = Node & {
  _id: Scalars['ID'];
  content: Scalars['String'];
  userId: Scalars['String'];
};
