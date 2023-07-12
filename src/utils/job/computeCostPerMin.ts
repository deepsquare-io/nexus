// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';

/**
 * Computes the cost per minute for a given job.
 *
 * The cost per minute is calculated based on the provider's price and the resources required by the job,
 * which include the number of tasks, GPU per task, CPU per task, and memory per CPU.
 *
 * @param {FullJobSummary} summary - The job object, which contains the resource requirements per task.
 *
 * @returns The cost per minute for the job, expressed in the smallest unit of the job's currency
 *   (like wei for Ethereum), and is always an integer.
 */
export function computeCostPerMin(summary: FullJobSummary): bigint {
  if (!summary.provider) return 0n;
  const tasks = summary.definition.ntasks;
  const gpuCost = summary.definition.gpuPerTask * summary.provider.providerPrices.gpuPricePerMin;
  const cpuCost = summary.definition.cpuPerTask * summary.provider.providerPrices.cpuPricePerMin;
  const memCost =
    summary.definition.memPerCpu * summary.definition.cpuPerTask * summary.provider.providerPrices.memPricePerMin;
  return (tasks * (gpuCost + cpuCost + memCost)) / 1000000n;
}
