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
import withConnectionRequired from '@components/hoc/withConnectionRequired';
import { useDeleteWorkflowMutation } from '@graphql/internal/client/generated/deleteWorkflow.generated';
import { useListWorkflowsQuery } from '@graphql/internal/client/generated/listWorkflows.generated';
import { DeleteSharp, EditSharp } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import { DataGrid } from '@mui/x-data-grid';

dayjs.extend(duration);

const WorkflowsPage: NextPage = withConnectionRequired(() => {
  const router = useRouter();

  const { data, loading } = useListWorkflowsQuery();

  const [remove] = useDeleteWorkflowMutation();

  return (
    <>
      <div className="h-[56rem]">
        <DataGrid
          loading={loading}
          sx={{
            '& .MuiDataGrid-actionsCell': {
              gap: 0.25,
            },
          }}
          columns={[
            {
              field: '_id',
              flex: 0.04,
              headerName: 'Workflow ID',
              type: 'string',
              sortable: false,
              filterable: false,
              align: 'right',
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
                    color="primary"
                    className="m-1"
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      router.push(`/sandbox?workflowId=${params.row._id}`);
                    }}
                  >
                    <EditSharp />
                  </Fab>
                  <Fab
                    color="primary"
                    className="m-1"
                    aria-label="cancel"
                    size="small"
                    onClick={async () => {
                      await remove({ variables: { workflowId: params.row._id } });
                    }}
                  >
                    <DeleteSharp />
                  </Fab>
                </div>
              ),
            },
          ]}
          autoHeight
          rowHeight={55}
          rows={data?.listWorkflows ?? []}
          pageSize={15}
          className="shadow-lg bg-white"
        ></DataGrid>
      </div>
    </>
  );
});

export default WorkflowsPage;
