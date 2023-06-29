import type { Job } from '@graphql/external/sbatchServiceClient/generated/Types';

export function resolveStorageType(job: Job): number {
  return job.output
    ? job.output.s3
      ? 2
      : job.output.http
      ? job.output.http.url === 'https://transfer.deepsquare.run/'
        ? 0
        : 1
      : 4
    : 4;
}
