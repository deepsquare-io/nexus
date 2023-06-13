import type { Address } from 'wagmi';
import { useContractRead, useContractReads } from 'wagmi';
import { useContext } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { ProviderManagerAbi } from '@abi/ProviderManager';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected, isWeb3 } from '@lib/types/AuthMethod';
import { ZERO_ADDRESS } from '@lib/web3/constants/address';
import { addressMetaScheduler, addressProviderManager } from '@lib/web3/constants/contracts';
import type {
  JobCostStruct,
  JobDefinitionStruct,
  JobStatus,
  JobStruct,
  JobTimeStruct,
  ProviderHardware,
  ProviderPrices,
  ProviderStatus,
  ProviderStruct,
} from '@lib/web3/types/DataStructs';

export default function useListJobs(
  start?: number,
  stop?: number,
): (JobStruct & { provider: ProviderStruct | undefined })[] {
  const { authMethod } = useContext(authContext);

  //TODO: Replace '0x0' with public address of portal provider
  const { data: idList } = useContractRead({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'getJobs',
    args: [isWeb3(authMethod) ? authMethod.address : '0x0'],
    watch: !isDisconnected(authMethod),
    enabled: !isDisconnected(authMethod),
  });

  const jobListConfig = { address: addressMetaScheduler, abi: MetaSchedulerAbi, functionName: 'jobs' };
  const { data: jobList } = useContractReads({
    contracts: idList?.slice(start, stop).map((id) => {
      return { ...jobListConfig, args: [id] };
    }),
    allowFailure: false,
    watch: !isDisconnected(authMethod),
    select: (data): JobStruct[] => {
      return (
        data as [
          string,
          JobStatus,
          Address,
          Address,
          JobDefinitionStruct,
          boolean,
          JobCostStruct,
          JobTimeStruct,
          string,
          boolean,
        ][]
      ).map((job): JobStruct => {
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
    (jobList as JobStruct[])?.filter((job) => job.providerAddr).map((job) => job.providerAddr),
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
    watch: !isDisconnected(authMethod),
    select: (data): ProviderStruct[] => {
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

  if (isDisconnected(authMethod)) return [];

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