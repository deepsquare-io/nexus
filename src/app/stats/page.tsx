'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import ChartComponent from '@components/charts/JobChart';
import Card from '@components/ui/containers/Card/Card';
import { WalletOrderBy } from '@graphql/external/statsClient/generated/Types';
import { useGetStatsQuery } from '@graphql/external/statsClient/generated/getStats.generated';
import formatAccount from '@utils/format/formatAccount';
import formatCredit from '@utils/format/formatCredit';
import formatDuration from '@utils/format/formatTime';

const StatsPage: NextPage = () => {
  const variables = useMemo(() => {
    const currentDate = dayjs();
    const thirtyDaysAgo = dayjs().subtract(30, 'day');
    return {
      days: 1,
      endTime: currentDate.toISOString(),
      startTime: thirtyDaysAgo.toISOString(),
      orderBy: WalletOrderBy.JOBS_SUBMITTED,
    };
  }, []);

  const { loading, data } = useGetStatsQuery({ variables, context: { clientName: 'stats' } });

  if (loading || !data) return <div></div>;

  return (
    <div>
      <Card className="flex flex-col grow p-8" title="DeepSquare Statistics">
        <h2 className="text-lg font-bold my-4">General Stats:</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between lg:w-1/2">
            <p>Total number of jobs:</p>
            <p>{data.jobMetrics.total}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between lg:w-1/2">
            <p>Compute credits consumed:</p>
            <p>{formatCredit(BigInt(data.creditsMetrics.spentTotal))}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between lg:w-1/2">
            <p>Total CPU usage:</p>
            <p>{formatDuration(data.cpuTimeMetrics.total * 60)}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between lg:w-1/2">
            <p>Total GPU usage:</p>
            <p>{formatDuration(data.gpuTimeMetrics.total * 60)}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between lg:w-1/2">
            <p>Unique Wallets:</p>
            <p>{data.walletMetrics.count}</p>
          </div>
        </div>
        <h2 className="text-lg font-bold my-4">Best Performers (jobs submitted):</h2>
        <div className="grid grid-cols-1 gap-4">
          <ul className="list-disc pl-0 space-y-4 mt-0">
            {data.walletMetrics.top10.map((performer) => (
              <li key={performer.key} className="flex flex-col md:flex-row justify-between  lg:w-1/2">
                <span>{formatAccount(performer.key, 4)}:</span> <span>{performer.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <ChartComponent data={data.jobMetrics.rateRange} />
      </Card>
    </div>
  );
};
export default StatsPage;
