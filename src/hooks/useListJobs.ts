import type { Address } from 'wagmi';
import { useContractRead, useContractReads } from 'wagmi';
import { useContext, useEffect } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { ProviderManagerAbi } from '@abi/ProviderManager';
import { useListJobLazyQuery } from '@graphql/internal/client/generated/listJobs.generated';
import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';
import type { JobCost, JobDefinition, JobSummary, JobTime } from '@graphql/internal/types/JobSummary';
import type { Provider, ProviderHardware, ProviderPrices } from '@graphql/internal/types/Provider';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected, isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import type { JobStatus } from '@lib/types/enums/JobStatus';
import type { ProviderStatus } from '@lib/types/enums/ProviderStatus';
import { ZERO_ADDRESS } from '@lib/web3/constants/address';
import { addressMetaScheduler, addressProviderManager } from '@lib/web3/constants/contracts';

export default function useListJobs(start?: number, stop?: number): FullJobSummary[] {
  const { authMethod } = useContext(authContext);

  const { data: idList } = useContractRead({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'getJobs',
    args: [isWeb3(authMethod) ? authMethod.address : '0x0'],
    watch: isWeb3(authMethod),
    enabled: isWeb3(authMethod),
  });

  const jobListConfig = { address: addressMetaScheduler, abi: MetaSchedulerAbi, functionName: 'jobs' };
  const { data: jobList } = useContractReads({
    contracts: idList?.slice(start, stop).map((id) => {
      return { ...jobListConfig, args: [id] };
    }),
    allowFailure: false,
    enabled: isWeb3(authMethod),
    watch: isWeb3(authMethod),
    select: (data): JobSummary[] => {
      return (
        data as [Address, JobStatus, Address, Address, JobDefinition, boolean, JobCost, JobTime, Address, boolean][]
      ).map((job): JobSummary => {
        return {
          jobId: job[0],
          status: job[1],
          customerAddr: job[2],
          providerAddr: job[3],
          definition: job[4],
          valid: job[5],
          cost: job[6],
          time: job[7],
          jobName: job[8],
          hasCancelRequest: job[9],
        };
      });
    },
  });

  const providerIds = new Set(
    (jobList as JobSummary[])?.filter((job) => job.providerAddr).map((job) => job.providerAddr),
  );

  providerIds.delete(ZERO_ADDRESS);
  const providerConfig = { address: addressProviderManager, abi: ProviderManagerAbi, functionName: 'providers' };
  const { data: providerList } = useContractReads({
    contracts: [...providerIds].map((providerAddr) => {
      return {
        ...providerConfig,
        args: [providerAddr],
      };
    }),
    allowFailure: false,
    enabled: isWeb3(authMethod),
    watch: isWeb3(authMethod),
    select: (data): Provider[] => {
      return (data as [Address, ProviderHardware, ProviderPrices, ProviderStatus, bigint, boolean, boolean][]).map(
        (provider) => {
          return {
            addr: provider[0],
            providerHardware: provider[1],
            providerPrices: provider[2],
            status: provider[3],
            jobCount: provider[4],
            valid: provider[5],
            linkListed: provider[6],
          };
        },
      );
    },
  });

  const [listJobs, { data }] = useListJobLazyQuery();

  useEffect(() => {
    if (isWeb2(authMethod)) void listJobs({ variables: { userId: authMethod.id } });
  }, [authMethod, listJobs]);

  if (isDisconnected(authMethod)) return [];

  if (isWeb2(authMethod) && data)
    return data.listJobs
      .map((job) => {
        return {
          ...job,
          definition: {
            ...job.definition,
            ntasks: BigInt(job.definition.ntasks),
            gpuPerTask: BigInt(job.definition.gpuPerTask),
            cpuPerTask: BigInt(job.definition.cpuPerTask),
            memPerCpu: BigInt(job.definition.memPerCpu),
          },
          time: {
            ...job.time,
            start: BigInt(job.time.start),
            end: BigInt(job.time.end),
            cancelRequestTimestamp: BigInt(job.time.cancelRequestTimestamp),
            blockNumberStateChange: BigInt(job.time.blockNumberStateChange),
          },
          cost: {
            ...job.cost,
            maxCost: BigInt(job.cost.maxCost),
            finalCost: BigInt(job.cost.finalCost),
            pendingTopUp: BigInt(job.cost.pendingTopUp),
          },
          provider: {
            ...job.provider,
            jobCount: BigInt(job.provider.jobCount),
            providerHardware: {
              nodes: BigInt(job.provider.providerHardware.nodes),
              gpus: BigInt(job.provider.providerHardware.gpus),
              cpus: BigInt(job.provider.providerHardware.cpus),
              mem: BigInt(job.provider.providerHardware.mem),
            },
            providerPrices: {
              gpuPricePerMin: BigInt(job.provider.providerPrices.gpuPricePerMin),
              cpuPricePerMin: BigInt(job.provider.providerPrices.cpuPricePerMin),
              memPricePerMin: BigInt(job.provider.providerPrices.memPricePerMin),
            },
          },
        };
      })
      .sort((a, b) => (a.jobId > b.jobId ? -1 : 1));

  return jobList
    ? jobList
        .map((job) => {
          return {
            ...job,
            provider: providerList?.find((provider) => provider.addr === job.providerAddr),
          };
        })
        .sort((a, b) => (a.jobId > b.jobId ? -1 : 1))
    : [];
}
