import { gql } from '@apollo/client';
import type * as Types from './Types';

export type FullJobSummaryFragmentFragment = {
  customerAddr: any;
  hasCancelRequest: boolean;
  jobId: any;
  jobName: any;
  providerAddr: any;
  status: Types.JobStatus;
  valid: boolean;
  cost: { delegateSpendingAuthority: boolean; finalCost: bigint; maxCost: bigint; pendingTopUp: bigint };
  definition: {
    batchLocationHash: string;
    cpuPerTask: bigint;
    gpuPerTask: bigint;
    memPerCpu: bigint;
    ntasks: bigint;
    storageType: number;
    uses: Array<{ key: string; value: string }>;
  };
  provider: {
    addr: any;
    jobCount: bigint;
    linkListed: boolean;
    status: Types.ProviderStatus;
    valid: boolean;
    providerHardware: { cpus: bigint; gpus: bigint; mem: bigint; nodes: bigint };
    providerPrices: { cpuPricePerMin: bigint; gpuPricePerMin: bigint; memPricePerMin: bigint };
  };
  time: { blockNumberStateChange: bigint; cancelRequestTimestamp: bigint; end: bigint; start: bigint };
};

export const FullJobSummaryFragmentFragmentDoc = /*#__PURE__*/ gql`
  fragment FullJobSummaryFragment on FullJobSummary {
    cost {
      delegateSpendingAuthority
      finalCost
      maxCost
      pendingTopUp
    }
    customerAddr
    definition {
      batchLocationHash
      cpuPerTask
      gpuPerTask
      memPerCpu
      ntasks
      storageType
      uses {
        key
        value
      }
    }
    hasCancelRequest
    jobId
    jobName
    provider {
      addr
      jobCount
      linkListed
      providerHardware {
        cpus
        gpus
        mem
        nodes
      }
      providerPrices {
        cpuPricePerMin
        gpuPricePerMin
        memPricePerMin
      }
      status
      valid
    }
    providerAddr
    status
    time {
      blockNumberStateChange
      cancelRequestTimestamp
      end
      start
    }
    valid
  }
`;
