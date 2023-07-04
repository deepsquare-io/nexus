import { JobStatus } from '@lib/types/enums/JobStatus';
import { isJobTerminated } from '@utils/job/isJobTerminated';

export function hasJobRun(status: number): boolean {
  return status === JobStatus.RUNNING || isJobTerminated(status);
}
