// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useContractRead, useContractReads } from 'wagmi';
import { useContext, useEffect } from 'react';
import { JobRepositoryAbi } from '@abi/JobRepository';
import { ProviderManagerAbi } from '@abi/ProviderManager';
import { useListJobLazyQuery } from '@graphql/internal/client/generated/listJobs.generated';
import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';
import type { JobSummary } from '@graphql/internal/types/objects/JobSummary';
import type { Provider } from '@graphql/internal/types/objects/Provider';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected, isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import { ZERO_ADDRESS } from '@lib/web3/constants/address';
import { addressJobRepository, addressProviderManager } from '@lib/web3/constants/contracts';

export default function useListJobs(start?: number, stop?: number): FullJobSummary[] {
  const { authMethod } = useContext(authContext);

  const { data: idList } = useContractRead({
    address: addressJobRepository,
    abi: JobRepositoryAbi,
    functionName: 'getByCustomer',
    args: [isWeb3(authMethod) ? authMethod.sub : '0x0'],
    watch: isWeb3(authMethod),
    enabled: isWeb3(authMethod),
  });

  const [listJobs, { data }] = useListJobLazyQuery();

  useEffect(() => {
    if (isWeb2(authMethod)) void listJobs();
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
    allowFailure: true,
    enabled: !isDisconnected(authMethod),
    watch: !isDisconnected(authMethod),
    select: (data): JobSummary[] => {
      return data.reduce<JobSummary[]>((jobList, job) => {
        if (job.status === 'success') {
          jobList.push(job.result as JobSummary);
        }
        return jobList;
      }, []);
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
      return data as Provider[];
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
