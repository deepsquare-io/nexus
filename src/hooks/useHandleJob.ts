import { toast } from 'react-toastify';
import { useContractWrite, usePublicClient } from 'wagmi';
import { useCallback, useState } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import useCreditAllowance from '@hooks/useCreditAllowance';
import useCreditIncreaseAllowance from '@hooks/useCreditIncreaseAllowance';
import useDebounce from '@hooks/useDebounce';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import { formatBytes32String } from '@utils/format/formatBytes32String';

export default function useHandleJob(
  amount: string,
  jobName: string,
  storageType: number,
  cpuPerTask?: number,
  ntasks?: number,
  gpuPerTask?: number,
  memPerCpu?: number,
): { handleJob: (batchLocationHash: string) => Promise<void>; loading: boolean } {
  const debouncedCpuPerTask = useDebounce(cpuPerTask, 500);
  const debouncedNtasks = useDebounce(ntasks, 500);
  const debouncedGpuPerTask = useDebounce(gpuPerTask, 500);
  const debouncedMemPerCpu = useDebounce(memPerCpu, 500);
  const debouncedStorageType = useDebounce(storageType, 500);
  const debouncedAmount = useDebounce(BigInt(amount), 500);
  const debouncedName = useDebounce(formatBytes32String(jobName), 500);
  const { allowance_wCredit } = useCreditAllowance(addressMetaScheduler);
  const missingAllowance = BigInt(amount) - allowance_wCredit;
  const { increaseAllowance, error: setAllowanceError } = useCreditIncreaseAllowance();

  const { writeAsync: requestNewJob, error: requestNewJobError } = useContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'requestNewJob',
  });

  const publicClient = usePublicClient();

  const [loading, setLoading] = useState<boolean>(false);

  const handleJob = useCallback(
    async (batchLocationHash: string) => {
      setLoading(true);
      try {
        if (missingAllowance > 0 && increaseAllowance && !setAllowanceError) {
          const increaseAllowanceTransaction = await toast.promise(increaseAllowance(missingAllowance), {
            error: 'Transaction rejected',
          });

          await toast.promise(publicClient.waitForTransactionReceipt({ hash: increaseAllowanceTransaction.hash }), {
            pending: 'Waiting for authorization confirmation',
            success: 'Authorization confirmed',
          });
        }

        if (requestNewJob && !requestNewJobError) {
          const requestNewJobTrasaction = await toast.promise(
            requestNewJob({
              args: [
                {
                  gpuPerTask: BigInt(debouncedGpuPerTask ?? 0),
                  cpuPerTask: BigInt(debouncedCpuPerTask ?? 0),
                  ntasks: BigInt(debouncedNtasks ?? 0),
                  memPerCpu: BigInt(debouncedMemPerCpu ?? 0),
                  storageType: debouncedStorageType,
                  batchLocationHash,
                  uses: [],
                },
                debouncedAmount,
                debouncedName,
                false,
              ],
            }),
            {
              error: 'Transaction rejected',
            },
          );

          await toast.promise(publicClient.waitForTransactionReceipt({ hash: requestNewJobTrasaction.hash }), {
            pending: 'Requesting new job...',
            success: 'Job has been submitted successfully!',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [
      missingAllowance,
      increaseAllowance,
      setAllowanceError,
      requestNewJob,
      requestNewJobError,
      publicClient,
      debouncedGpuPerTask,
      debouncedCpuPerTask,
      debouncedNtasks,
      debouncedMemPerCpu,
      debouncedStorageType,
      debouncedAmount,
      debouncedName,
    ],
  );
  return {
    handleJob,
    loading,
  };
}
