import type { Address } from 'wagmi';

export enum JobStatus {
  PENDING,
  META_SCHEDULED,
  SCHEDULED,
  RUNNING,
  CANCELLED,
  FINISHED,
  FAILED,
  OUT_OF_CREDITS,
}

export type JobCostStruct = {
  maxCost: bigint;
  finalCost: bigint;
  autoTopUp: boolean;
};

export type JobTimeStruct = {
  start: bigint;
  end: bigint;
  cancelRequestTimestamp: bigint;
  blockNumberStateChange: bigint;
};

export type JobDefinitionStruct = {
  gpuPerTask: bigint;
  memPerCpu: bigint;
  cpuPerTask: bigint;
  ntasks: bigint;
  batchLocationHash: string;
  storageType: bigint;
};

export type JobStruct = {
  jobId: string;
  status: number;
  customerAddr: Address;
  providerAddr: Address;
  definition: JobDefinitionStruct;
  valid: boolean;
  cost: JobCostStruct;
  time: JobTimeStruct;
  jobName: string;
  hasCancelRequest: boolean;
};

export enum ProviderStatus {
  UNKNOWN,
  WAITING_APPROVAL,
  JOINED,
  KICKED,
  BANNED,
}

export type ProviderHardware = {
  nodes: bigint;
  gpus: bigint;
  cpus: bigint;
  mem: bigint;
};

export type ProviderPrices = {
  gpuPricePerMin: bigint;
  cpuPricePerMin: bigint;
  memPricePerMin: bigint;
};

export type ProviderStruct = {
  addr: Address;
  providerHardware: ProviderHardware;
  providerPrices: ProviderPrices;
  status: ProviderStatus;
  jobCount: bigint;
  valid: boolean;
  linkListed: boolean;
};
