// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import { useContractRead, useContractReads } from 'wagmi';
import { useContext, useEffect } from 'react';
import { JobRepositoryAbi } from '@abi/JobRepository';
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
import { addressJobRepository, addressProviderManager } from '@lib/web3/constants/contracts';

export default function useListJobs(start?: number, stop?: number): FullJobSummary[] {
  const { authMethod } = useContext(authContext);

  const { data: idList } = useContractRead({
    address: addressJobRepository,
    abi: JobRepositoryAbi,
    functionName: 'getByCustomer',
    args: [isWeb3(authMethod) ? authMethod.address : '0x0'],
    watch: isWeb3(authMethod),
    enabled: isWeb3(authMethod),
  });

  const [listJobs, { data }] = useListJobLazyQuery();

  useEffect(() => {
    if (isWeb2(authMethod)) void listJobs({ variables: { userId: authMethod.id } });
  }, [authMethod, listJobs]);

  const jobListConfig = { address: addressJobRepository, abi: JobRepositoryAbi, functionName: 'get' };
  const { data: jobList } = useContractReads({
    contracts: isWeb3(authMethod)
      ? idList?.slice(start, stop).map((id) => {
          return { ...jobListConfig, args: [id] };
        })
      : isWeb2(authMethod)
      ? data?.listJobs?.slice(start, stop).map((id) => {
          return { ...jobListConfig, args: [id] };
        })
      : [{ ...jobListConfig, args: [] }],
    allowFailure: false,
    enabled: !isDisconnected(authMethod),
    watch: !isDisconnected(authMethod),
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
  const providerConfig = { address: addressProviderManager, abi: ProviderManagerAbi, functionName: 'getProvider' };
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
