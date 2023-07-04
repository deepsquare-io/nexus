import type { Address } from 'wagmi';
import type { JobStatus } from '@deepsquare/deepsquare-client';
import type { ProviderStatus } from '@lib/types/enums/ProviderStatus';

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
  status: JobStatus;
  customerAddr: Address;
  providerAddr: Address;
  definition: JobDefinitionStruct;
  valid: boolean;
  cost: JobCostStruct;
  time: JobTimeStruct;
  jobName: string;
  hasCancelRequest: boolean;
};

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
