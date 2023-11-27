import { gql } from '@apollo/client';

export type FullJobSummaryFragmentFragment = {
  customerAddr: any;
  hasCancelRequest: boolean;
  jobId: any;
  jobName: any;
  providerAddr: any;
  status: number;
  valid: boolean;
  cost: { delegateSpendingAuthority: boolean; finalCost: string; maxCost: string; pendingTopUp: string };
  definition: {
    batchLocationHash: string;
    cpusPerTask: string;
    gpusPerTask: string;
    memPerCpu: string;
    ntasks: string;
    storageType: number;
    uses: Array<{ key: string; value: string }>;
  };
  provider: {
    addr: any;
    jobCount: string;
    linkListed: boolean;
    status: number;
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
      cpusPerTask
      gpusPerTask
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
