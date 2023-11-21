// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { buildSchemaSync, registerEnumType } from 'type-graphql';
import { JobStatus } from '@deepsquare/deepsquare-client';
import CancelJobMutation from '@graphql/internal/mutations/CancelJobMutation';
import CreateUserMutation from '@graphql/internal/mutations/CreateUserMutation';
import DeleteWorkflowMutation from '@graphql/internal/mutations/DeleteWorkflowMutation';
import LoginFromWeb2Mutation from '@graphql/internal/mutations/LoginFromWeb2Mutation';
import LoginFromWeb3Mutation from '@graphql/internal/mutations/LoginFromWeb3Mutation';
import RequestJobMutation from '@graphql/internal/mutations/RequestJobMutation';
import SaveWorkflowMutation from '@graphql/internal/mutations/SaveWorkflowMutation';
import SetWorkflowVisibilityMutation from '@graphql/internal/mutations/SetWorkflowVisibilityMutation';
import TopUpMutation from '@graphql/internal/mutations/TopUpMutation';
import GetJobHashQuery from '@graphql/internal/queries/GetJobHashQuery';
import GetWorkflowQuery from '@graphql/internal/queries/GetWorkflowQuery';
import ListJobsQuery from '@graphql/internal/queries/ListJobsQuery';
import ListWorkflowsQuery from '@graphql/internal/queries/ListWorkflowsQuery';
import PingQuery from '@graphql/internal/queries/PingQuery';
import { BigIntScalar } from '@graphql/internal/scalars/BigIntScalar';
import HexScalar from '@graphql/internal/scalars/HexScalar';
import container from '@lib/app/container';
import { ProviderStatus } from '@lib/types/enums/ProviderStatus';

registerEnumType(JobStatus, { name: 'JobStatus' });
registerEnumType(ProviderStatus, { name: 'ProviderStatus' });

export default function createSchema() {
  return buildSchemaSync({
    scalarsMap: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: 'Hex' as any,
        scalar: HexScalar,
      },
      {
        type: BigInt,
        scalar: BigIntScalar,
      },
    ],
    resolvers: [
      // Queries
      GetJobHashQuery,
      GetWorkflowQuery,
      ListJobsQuery,
      ListWorkflowsQuery,
      PingQuery,

      // Mutations
      CancelJobMutation,
      CreateUserMutation,
      DeleteWorkflowMutation,
      LoginFromWeb2Mutation,
      LoginFromWeb3Mutation,
      RequestJobMutation,
      SaveWorkflowMutation,
      SetWorkflowVisibilityMutation,
      TopUpMutation,
    ],
    container: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(someClass: any): any {
        return container.resolve(someClass);
      },
    },
  });
}
