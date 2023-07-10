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
  cost: { delegateSpendingAuthority: boolean; finalCost: string; maxCost: string; pendingTopUp: string };
  definition: {
    batchLocationHash: string;
    cpuPerTask: string;
    gpuPerTask: string;
    memPerCpu: string;
    ntasks: string;
    storageType: number;
    uses: Array<{ key: string; value: string }>;
  };
  provider: {
    addr: any;
    jobCount: string;
    linkListed: boolean;
    status: Types.ProviderStatus;
    valid: boolean;
    providerHardware: { cpus: string; gpus: string; mem: string; nodes: string };
    providerPrices: { cpuPricePerMin: string; gpuPricePerMin: string; memPricePerMin: string };
  };
  time: { blockNumberStateChange: string; cancelRequestTimestamp: string; end: string; start: string };
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
