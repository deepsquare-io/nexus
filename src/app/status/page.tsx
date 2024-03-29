'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useState } from 'react';
import JobStatusChip from '@components/chips/JobStatusChip';
import TopUpDialog from '@components/dialogs/TopUpDialog';
import withConnectionRequired from '@components/hoc/withConnectionRequired';
import { JobStatus } from '@deepsquare/deepsquare-client';
import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';
import useCancelJob from '@hooks/useCancelJob';
import useListJobs from '@hooks/useListJobs';
import useWindowSize from '@hooks/useWindowSize';
import { CancelSharp, MoreTime } from '@mui/icons-material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import formatBigNumber from '@utils/format/formatBigNumber';
import formatCredit from '@utils/format/formatCredit';
import { formatEther, formatEtherLossy } from '@utils/format/formatEther';
import { formatWei } from '@utils/format/formatWei';
import { hasJobRun } from '@utils/hasJobRun';
import hex2dec from '@utils/hex2dec';
import { computeCost } from '@utils/job/computeCost';
import { computeCostPerMin } from '@utils/job/computeCostPerMin';
import { isJobTerminated } from '@utils/job/isJobTerminated';
import mustBeHex from '@utils/parse/mustBeHex';
import { parseBytes32String } from '@utils/parse/parseBytes32String';

dayjs.extend(duration);

const StatusPage: NextPage = withConnectionRequired(() => {
  const router = useRouter();

  const { width } = useWindowSize();

  const [topUpJob, setTopUpJob] = useState<FullJobSummary | undefined>(undefined);

  const { cancel } = useCancelJob();

  const [loading] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<FullJobSummary | undefined>(undefined);

  const jobs = useListJobs();

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    const field = event.currentTarget.dataset.field!;
    if (field !== 'cost') return;
    const id = parseInt(event.currentTarget.parentElement!.dataset.rowindex!);
    setValue(jobs[id]);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const columns =
    width && width < 1440
      ? ([
          {
            field: 'jobId',
            flex: 0.04,
            headerName: 'Job Id',
            type: 'string',
            sortable: false,
            filterable: false,
            align: 'right',
            valueFormatter: ({ value }) => hex2dec(value),
          },
          {
            field: 'jobName',
            flex: 0.2,
            headerName: 'Job name',
            type: 'string',
            sortable: false,
            filterable: false,
            valueFormatter: ({ value }) => parseBytes32String(value),
          },
          {
            field: 'status',
            flex: 0.2,
            headerName: 'Status',
            type: 'string',
            sortable: false,
            filterable: false,
            renderCell: (params) => <JobStatusChip status={params.row.status} />,
          },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.3,
            minWidth: 120,
            maxWidth: 120,
            renderCell: (params) => (
              <div className="flex justify-center content-center">
                <Fab
                  disabled={isJobTerminated(params.row.status)}
                  color="primary"
                  className="m-1"
                  aria-label="cancel"
                  size="small"
                  onClick={async () => {
                    if (isJobTerminated(params.row.status) || !cancel) return;
                    await cancel(mustBeHex(params.row.jobId));
                  }}
                >
                  <CancelSharp />
                </Fab>
                <Fab
                  color="primary"
                  className="m-1"
                  aria-label="get logs"
                  size="small"
                  onClick={() => {
                    router.push(`/job/${params.row.jobId}`);
                  }}
                >
                  <DescriptionOutlinedIcon />
                </Fab>
              </div>
            ),
          },
        ] as GridColDef<FullJobSummary>[])
      : ([
          {
            field: 'jobId',
            description: 'The global job id',
            flex: 0.03,
            headerName: 'Job Id',
            type: 'string',
            sortable: false,
            filterable: false,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: ({ value }) => hex2dec(value),
          },
          {
            field: 'jobName',
            description: 'Job name',
            flex: 0.15,
            headerName: 'Job name',
            type: 'string',
            sortable: false,
            filterable: false,
            valueFormatter: ({ value }) => parseBytes32String(value),
          },
          {
            field: 'status',
            description:
              'Job status starts as PENDING when submitted. Once a cluster is found by the meta-scheduler, it becomes META_SCHEDULED. After the cluster claims the job, it becomes SCHEDULED and waits in the queue for execution. Once started, the job status changes to RUNNING. Successful jobs are marked as FINISHED, while unsuccessful ones can either be FAILED or OUT_OF_CREDITS. The last status is CANCELLED, which is self-explanatory',
            flex: 0.08,
            headerName: 'Status',
            type: 'string',
            sortable: false,
            filterable: false,
            renderCell: (params) => <JobStatusChip status={params.row.status} />,
          },
          {
            field: 'timeLeft',
            description: 'The authorized and prepaid time that a user can use a cloud computing resource for',
            flex: 0.08,
            headerName: 'Available Time Left',
            type: 'string',
            sortable: false,
            filterable: false,
            valueGetter: (params) => {
              if (
                (params.row.status !== JobStatus.SCHEDULED && params.row.status !== JobStatus.RUNNING) ||
                !params.row.provider
              )
                return '-';
              const maxDuration = dayjs.duration(
                formatEtherLossy(formatWei(params.row.cost.maxCost) / computeCostPerMin(params.row)) * 60 * 1000,
              );
              if (params.row.status === JobStatus.SCHEDULED) {
                return `${maxDuration.as('minutes').toFixed(0)} min`;
              } else {
                const remainingTime = maxDuration
                  .subtract(dayjs.duration(dayjs().diff(dayjs(Number(params.row.time.start * 1000n)))))
                  .as('minutes');
                return remainingTime >= 0 ? `${remainingTime.toFixed(0)} min` : 'Stalled';
              }
            },
          },
          {
            field: 'timestamp',
            description: 'Amount of time that a job has been running since it started',
            flex: 0.05,
            headerName: 'Duration',
            type: 'string',
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
              hasJobRun(params.row.status)
                ? `${(isJobTerminated(params.row.status) ? dayjs(Number(params.row.time.end * 1000n)) : dayjs()).diff(
                    dayjs(Number(params.row.time.start * 1000n)),
                    'minutes',
                  )} min`
                : '-',
          },
          {
            field: 'hourlyCost',
            description: 'Amount of token credits charged per minute for the service',
            flex: 0.1,
            headerName: 'Cost/min',
            type: 'string',
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
              params.row.provider ? `${formatEther(computeCostPerMin(params.row))} creds/min` : '-',
          },
          {
            field: 'cost',
            description: 'Amount of token credits charged for the service',
            flex: 0.05,
            headerName: 'Cost',
            type: 'string',
            sortable: false,
            filterable: false,
            valueGetter: (params) => (hasJobRun(params.row.status) ? formatEther(computeCost(params.row)) : '-'),
          },
          {
            field: 'actions',
            description:
              'Refers to the various operations on a job or resource, such as cancelling, downloading, or topping up',
            headerName: 'Actions',
            flex: 0.22,
            minWidth: 230,
            renderCell: (params) => (
              <div className="flex justify-center space-x-2">
                <Tooltip title="Job logs">
                  <Button
                    className="rounded h-11"
                    color="primary"
                    aria-label="get logs"
                    onClick={() => {
                      router.push(`/job/${params.row.jobId}`);
                    }}
                  >
                    <DescriptionOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Top up">
                  <Button
                    className="rounded h-11"
                    color="primary"
                    disabled={!(params.row.status === JobStatus.RUNNING || params.row.status === JobStatus.SCHEDULED)}
                    aria-label="top up"
                    onClick={() => {
                      if (isJobTerminated(params.row.status) || !cancel) return;
                      setTopUpJob(params.row);
                    }}
                  >
                    <MoreTime />
                  </Button>
                </Tooltip>
                <Tooltip title="Cancel job">
                  <span>
                    <Button
                      className="rounded h-11"
                      color="primary"
                      disabled={isJobTerminated(params.row.status)}
                      aria-label="cancel"
                      onClick={async () => {
                        if (isJobTerminated(params.row.status) || !cancel) return;
                        await cancel(params.row.jobId);
                      }}
                    >
                      <CancelOutlinedIcon />
                    </Button>
                  </span>
                </Tooltip>
              </div>
            ),
          },
        ] as GridColDef<FullJobSummary>[]);

  const columnBuffer = columns.map((col) => ({
    ...col,
    headerClassName: 'font-bold text-gray-600 bg-gray-50',
  }));

  return (
    <>
      <div className="h-[56rem]">
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                hourlyCost: false,
                cost: true,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          loading={loading}
          slotProps={{
            cell: {
              onMouseEnter: handlePopoverOpen,
              onMouseLeave: handlePopoverClose,
            },
          }}
          sx={{
            '& .MuiDataGrid-actionsCell': {
              gap: 0.25,
            },
          }}
          columns={columnBuffer}
          autoHeight
          isRowSelectable={() => false}
          rowHeight={55}
          rows={jobs.map((job, index) => {
            return {
              id: index + 1,
              ...job,
            };
          })}
          className="shadow-lg bg-white"
        ></DataGrid>
        {!!value && !!value.provider && (
          <Popover
            sx={{
              pointerEvents: 'none',
            }}
            open={!!anchorEl}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <div className="m-2">
              <div>
                ={' '}
                {(isJobTerminated(value.status) ? dayjs(Number(value.time.end * 1000n)) : dayjs()).diff(
                  dayjs(Number(value.time.start * 1000n)),
                  'minutes',
                )}{' '}
                min × &#91; {value.definition.ntasks.toString()} tasks ×
              </div>
              <div>
                &#40; {value.definition.cpusPerTask.toString()} CPU/task ×{' '}
                {formatCredit(value.provider.providerPrices.cpuPricePerMin)} credits/(CPU.min)
              </div>
              <div>
                + {((value.definition.cpusPerTask * value.definition.memPerCpu) / 1000n).toString()} GB/task ×{' '}
                {formatBigNumber(value.provider.providerPrices.memPricePerMin, {
                  divide: 15,
                  precision: 7,
                })}{' '}
                credits/(GB.min) &#41;
              </div>
              <div>
                + {value.definition.gpus.toString()} GPU × {formatCredit(value.provider.providerPrices.gpuPricePerMin)}{' '}
                credits/(GPU.min) &#93;
              </div>
            </div>
          </Popover>
        )}
      </div>
      {typeof topUpJob !== 'undefined' && (
        <TopUpDialog
          job={topUpJob}
          open={typeof topUpJob !== 'undefined'}
          onClose={() => {
            setTopUpJob(undefined);
          }}
        />
      )}
    </>
  );
});

export default StatusPage;
