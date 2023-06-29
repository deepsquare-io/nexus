import { buildSchemaSync, registerEnumType } from 'type-graphql';
import RequestJobMutation from '@graphql/internal/mutations/RequestJobMutation';
import StartStreamJobLogsQuery from '@graphql/internal/queries/StartStreamJobLogsQuery';
import container from '@lib/app/container';
import { JobStatus } from '@lib/types/enums/JobStatus';
import { ProviderStatus } from '@lib/types/enums/ProviderStatus';

registerEnumType(JobStatus, { name: 'JobStatus' });
registerEnumType(ProviderStatus, { name: 'ProviderStatus' });

export default function createSchema() {
  return buildSchemaSync({
    resolvers: [
      // Queries
      StartStreamJobLogsQuery,

      // Mutations
      RequestJobMutation,
    ],
    container: {
      get(someClass: any): any {
        return container.resolve(someClass);
      },
    },
  });
}
