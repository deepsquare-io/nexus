import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';
import { computeCostPerMin } from './computeCostPerMin';
import { isJobTerminated } from './isJobTerminated';

export function jobDurationInMinutes(job: FullJobSummary): bigint {
  return BigInt(Math.floor(Date.now() / 1000)) - job.time.start / 60n;
}

/**
 * Computes the current cost of a job.
 *
 * If the job has already been terminated, it returns the final cost of the job. Otherwise, it calculates
 * the current cost based on the time elapsed since the start of the job and the cost per minute.
 *
 * @param {FullJobSummary} summary - The job object. It includes properties such as the status and the cost of the job.
 *
 * @returns The current cost of the job. It's expressed in the smallest unit of the job's currency
 *   (like wei for Ethereum), and is always an integer.
 */
export function computeCost(summary: FullJobSummary): bigint {
  return isJobTerminated(summary.status)
    ? summary.cost.finalCost
    : jobDurationInMinutes(summary) * computeCostPerMin(summary);
}
