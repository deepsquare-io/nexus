// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
                      gpusPerTask: BigInt(job.resources.gpusPerTask),
                      cpusPerTask: BigInt(job.resources.cpusPerTask),
                      ntasks: BigInt(job.resources.tasks),
                      memPerCpu: BigInt(job.resources.memPerCpu),
                      storageType: resolveStorageType(job),
                      batchLocationHash,
                      uses: [],
                      affinity: [],
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
          await toast.promise(
            requestJob({
              variables: {
                job,
                jobName: debouncedName,
                maxAmount: debouncedAmount.toString(),
                userId: authMethod.sub,
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
