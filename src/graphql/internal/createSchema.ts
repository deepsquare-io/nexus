import { buildSchemaSync, registerEnumType } from 'type-graphql';
import { JobStatus } from '@deepsquare/deepsquare-client';
import CancelJobMutation from '@graphql/internal/mutations/CancelJobMutation';
import RequestJobMutation from '@graphql/internal/mutations/RequestJobMutation';
import GetJobHashQuery from '@graphql/internal/queries/GetJobHashQuery';
import ListJobsQuery from '@graphql/internal/queries/ListJobsQuery';
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
      ListJobsQuery,
      PingQuery,

      // Mutations
      CancelJobMutation,
      RequestJobMutation,
    ],
    container: {
      get(someClass: any): any {
        return container.resolve(someClass);
      },
    },
  });
}
