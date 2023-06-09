import { JobStatus } from '@lib/web3/types/DataStructs';

export function isJobTerminated(status: number): boolean {
  return (
    status === JobStatus.CANCELLED ||
    status === JobStatus.FAILED ||
    status === JobStatus.FINISHED ||
    status === JobStatus.OUT_OF_CREDITS
  );
}
