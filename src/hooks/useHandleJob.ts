import { toast } from 'react-toastify';
import { useContractWrite, usePublicClient } from 'wagmi';
import { useCallback, useContext, useState } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import type { Job } from '@graphql/external/sbatchServiceClient/generated/Types';
import { useSubmitMutation } from '@graphql/external/sbatchServiceClient/generated/createJob.generated';
import { useRequestJobMutation } from '@graphql/internal/client/generated/requestJob.generated';
import useCreditAllowance from '@hooks/useCreditAllowance';
import useCreditIncreaseAllowance from '@hooks/useCreditIncreaseAllowance';
import useDebounce from '@hooks/useDebounce';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import { formatBytes32String } from '@utils/format/formatBytes32String';
import { resolveStorageType } from '@utils/resolveStorageType';

export default function useHandleJob(
  amount: string,
  jobName: string,
): { handleJob: (job: Job) => Promise<void>; loading: boolean } {
  const debouncedAmount = useDebounce(BigInt(amount), 500);
  const debouncedName = useDebounce(jobName, 500);
  const { allowance_wCredit } = useCreditAllowance(addressMetaScheduler);
  const missingAllowance = BigInt(amount) - allowance_wCredit;
  const { increaseAllowance, error: setAllowanceError } = useCreditIncreaseAllowance();
  const [submit] = useSubmitMutation({ context: { clientName: 'sbatch' } });
  const { authMethod } = useContext(authContext);
  const [requestJob] = useRequestJobMutation();

  const { writeAsync: requestNewJob, error: requestNewJobError } = useContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'requestNewJob',
  });

  const publicClient = usePublicClient();

  const [loading, setLoading] = useState<boolean>(false);

  const handleJob = useCallback(
    async (job: Job) => {
      setLoading(true);
      try {
        if (isWeb3(authMethod)) {
          const batchLocationHash = (
            await submit({
              variables: { job },
            })
          ).data?.submit;
          if (batchLocationHash) {
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
                      gpuPerTask: BigInt(job.resources.gpusPerTask),
                      cpuPerTask: BigInt(job.resources.cpusPerTask),
                      ntasks: BigInt(job.resources.tasks),
                      memPerCpu: BigInt(job.resources.memPerCpu),
                      storageType: resolveStorageType(job),
                      batchLocationHash,
                      uses: [],
                    },
                    debouncedAmount,
                    formatBytes32String(debouncedName),
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
          }
        } else if (isWeb2(authMethod)) {
          console.log(debouncedAmount.toString());
          await toast.promise(
            requestJob({
              variables: {
                job,
                jobName: debouncedName,
                maxAmount: debouncedAmount.toString(),
              },
            }),
            {
              pending: 'Requesting new job...',
              success: 'Job has been submitted successfully!',
            },
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [
      authMethod,
      submit,
      missingAllowance,
      increaseAllowance,
      setAllowanceError,
      requestNewJob,
      requestNewJobError,
      publicClient,
      debouncedAmount,
      debouncedName,
      requestJob,
    ],
  );
  return {
    handleJob,
    loading,
  };
}
