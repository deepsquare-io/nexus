import { toast } from 'react-toastify';
import type { Address } from 'wagmi';
import { useContractWrite, usePublicClient } from 'wagmi';
import { useContext } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { useCancelJobMutation } from '@graphql/internal/client/generated/cancelJob.generated';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';

interface UseCancelJobOutput {
  cancel: (jobId: Address) => Promise<void>;
  error: Error | null;
}

export default function useCancelJob(): UseCancelJobOutput {
  const { writeAsync, error } = useContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'cancelJob',
  });

  const [cancelJob] = useCancelJobMutation();

  const { authMethod } = useContext(authContext);

  const publicClient = usePublicClient();

  return {
    cancel: async (jobId: Address) => {
      if (isWeb3(authMethod)) {
        const cancelTransaction = await toast.promise(writeAsync({ args: [jobId] }), {
          error: 'Transaction rejected',
        });

        await toast.promise(publicClient.waitForTransactionReceipt({ hash: cancelTransaction.hash }), {
          success: 'Job successfully cancelled',
        });
      } else if (isWeb2(authMethod)) await cancelJob({ variables: { jobId } });
    },
    error,
  };
}
