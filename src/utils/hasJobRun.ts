import { JobStatus } from '@lib/web3/types/DataStructs';
import { isJobTerminated } from '@utils/isJobTerminated';

export function hasJobRun(status: number): boolean {
  return status === JobStatus.RUNNING || isJobTerminated(status);
}
