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
};

export type BoreInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  boreAddress?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  targetPort: Scalars['Int']['input'];
};

export type ContainerRunInput = {
  apptainer?: InputMaybe<Scalars['Boolean']['input']>;
  deepsquareHosted?: InputMaybe<Scalars['Boolean']['input']>;
  image: Scalars['String']['input'];
  mountHome?: InputMaybe<Scalars['Boolean']['input']>;
  mounts?: InputMaybe<Array<MountInput>>;
  password?: InputMaybe<Scalars['String']['input']>;
  readOnlyRootFS?: InputMaybe<Scalars['Boolean']['input']>;
  registry?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  x11?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnvVarInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ForRangeInput = {
  begin: Scalars['Int']['input'];
  end: Scalars['Int']['input'];
  increment?: InputMaybe<Scalars['Int']['input']>;
};

export type GetJobHashOutput = {
  address: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type HttpDataInput = {
  url: Scalars['String']['input'];
};

export type JobInput = {
  continuousOutputSync?: InputMaybe<Scalars['Boolean']['input']>;
  enableLogging?: InputMaybe<Scalars['Boolean']['input']>;
  env?: InputMaybe<Array<EnvVarInput>>;
  input?: InputMaybe<TransportDataInput>;
  inputMode?: InputMaybe<Scalars['Int']['input']>;
  output?: InputMaybe<TransportDataInput>;
  resources: JobResourcesInput;
  steps: Array<StepInput>;
  virtualNetworks?: InputMaybe<Array<VirtualNetworkInput>>;
};

export type JobResourcesInput = {
  cpusPerTask: Scalars['Int']['input'];
  gpus: Scalars['Int']['input'];
  memPerCpu: Scalars['Int']['input'];
  tasks: Scalars['Int']['input'];
};

export type LabelInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type MountInput = {
  containerDir: Scalars['String']['input'];
  hostDir: Scalars['String']['input'];
  options: Scalars['String']['input'];
};

export type Mutation = {
  cancelJob: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  loginFromWeb2: Scalars['String']['output'];
  loginFromWeb3: Scalars['String']['output'];
  requestJob: Scalars['Boolean']['output'];
  saveWorkflow: Scalars['Boolean']['output'];
  setWorkflowVisibility: Scalars['Boolean']['output'];
  topUp: Scalars['Boolean']['output'];
};

export type MutationCancelJobArgs = {
  jobId: Scalars['String']['input'];
};

export type MutationCreateUserArgs = {
  userId: Scalars['String']['input'];
};

export type MutationDeleteWorkflowArgs = {
  workflowId: Scalars['String']['input'];
};

export type MutationLoginFromWeb2Args = {
  firebaseToken: Scalars['String']['input'];
};

export type MutationLoginFromWeb3Args = {
  address: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type MutationRequestJobArgs = {
  job: JobInput;
  jobName: Scalars['String']['input'];
  labels?: Array<LabelInput>;
  maxAmount: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationSaveWorkflowArgs = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  workflowId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSetWorkflowVisibilityArgs = {
  isPublic: Scalars['Boolean']['input'];
  workflowId: Scalars['String']['input'];
};

export type MutationTopUpArgs = {
  amount: Scalars['String']['input'];
  jobId: Scalars['String']['input'];
};

export type NetworkInterfaceInput = {
  bore?: InputMaybe<BoreInput>;
  vnet?: InputMaybe<VNetInput>;
  wireguard?: InputMaybe<WireguardInput>;
};

export type Node = {
  _id: Scalars['ID']['output'];
};

export type Query = {
  getJobHash: GetJobHashOutput;
  getWorkflow?: Maybe<Workflow>;
  listJobs: Array<Scalars['String']['output']>;
  listWorkflows: Array<Workflow>;
  ping: Scalars['String']['output'];
};

export type QueryGetJobHashArgs = {
  jobId: Scalars['String']['input'];
};

export type QueryGetWorkflowArgs = {
  workflowId: Scalars['String']['input'];
};

export type QueryPingArgs = {
  pong?: InputMaybe<Scalars['String']['input']>;
};

export type S3DataInput = {
  accessKeyId: Scalars['String']['input'];
  bucketUrl: Scalars['String']['input'];
  deleteSync?: InputMaybe<Scalars['Boolean']['input']>;
  endpointUrl: Scalars['String']['input'];
  path: Scalars['String']['input'];
  region: Scalars['String']['input'];
  secretAccessKey: Scalars['String']['input'];
};

export type StepAsyncLaunchInput = {
  handleName?: InputMaybe<Scalars['String']['input']>;
  signalOnParentStepExit?: InputMaybe<Scalars['Int']['input']>;
  steps: Array<StepInput>;
};

export type StepForInput = {
  items?: InputMaybe<Array<Scalars['String']['input']>>;
  parallel: Scalars['Boolean']['input'];
  range?: InputMaybe<ForRangeInput>;
  steps: Array<StepInput>;
};

export type StepInput = {
  catch?: InputMaybe<Array<StepInput>>;
  dependsOn?: InputMaybe<Array<Scalars['String']['input']>>;
  finally?: InputMaybe<Array<StepInput>>;
  for?: InputMaybe<StepForInput>;
  if?: InputMaybe<Scalars['String']['input']>;
  launch?: InputMaybe<StepAsyncLaunchInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  run?: InputMaybe<StepRunInput>;
  steps?: InputMaybe<Array<StepInput>>;
  use?: InputMaybe<StepUseInput>;
};

export type StepRunInput = {
  command: Scalars['String']['input'];
  container?: InputMaybe<ContainerRunInput>;
  customNetworkInterfaces?: InputMaybe<Array<NetworkInterfaceInput>>;
  disableCpuBinding?: InputMaybe<Scalars['Boolean']['input']>;
  dns?: InputMaybe<Array<Scalars['String']['input']>>;
  env?: InputMaybe<Array<EnvVarInput>>;
  mapGid?: InputMaybe<Scalars['Int']['input']>;
  mapUid?: InputMaybe<Scalars['Int']['input']>;
  mpi?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  resources?: InputMaybe<StepRunResourcesInput>;
  shell?: InputMaybe<Scalars['String']['input']>;
  workDir?: InputMaybe<Scalars['String']['input']>;
};

export type StepRunResourcesInput = {
  cpusPerTask?: InputMaybe<Scalars['Int']['input']>;
  gpusPerTask?: InputMaybe<Scalars['Int']['input']>;
  memPerCpu?: InputMaybe<Scalars['Int']['input']>;
  tasks?: InputMaybe<Scalars['Int']['input']>;
};

export type StepUseInput = {
  args?: InputMaybe<Array<EnvVarInput>>;
  exportEnvAs?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
  steps?: InputMaybe<Array<StepInput>>;
};

export type TransportDataInput = {
  http?: InputMaybe<HttpDataInput>;
  s3?: InputMaybe<S3DataInput>;
};

export type VNetInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type VirtualNetworkInput = {
  gatewayAddress: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type WireguardInput = {
  address?: InputMaybe<Array<Scalars['String']['input']>>;
  peers?: InputMaybe<Array<WireguardPeerInput>>;
  privateKey: Scalars['String']['input'];
};

export type WireguardPeerInput = {
  allowedIPs?: InputMaybe<Array<Scalars['String']['input']>>;
  endpoint?: InputMaybe<Scalars['String']['input']>;
  persistentKeepalive?: InputMaybe<Scalars['Int']['input']>;
  preSharedKey?: InputMaybe<Scalars['String']['input']>;
  publicKey: Scalars['String']['input'];
};

export type Workflow = Node & {
  _id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
};
