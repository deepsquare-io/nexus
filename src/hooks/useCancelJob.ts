import type { Address } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import type { SendTransactionResult } from '@wagmi/core';

interface UseCancelJobOutput {
  cancel: (jobId: Address) => Promise<SendTransactionResult>;
  error: Error | null;
}

export default function useCancelJob(): UseCancelJobOutput {
  const { writeAsync, error } = useContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'cancelJob',
  });

  return {
    cancel: async (jobId: Address) => {
      return writeAsync({ args: [jobId] });
    },
    error,
  };
}
