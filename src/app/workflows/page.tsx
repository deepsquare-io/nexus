'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import withConnectionRequired from '@components/hoc/withConnectionRequired';
import { useDeleteWorkflowMutation } from '@graphql/internal/client/generated/deleteWorkflow.generated';
import { useListWorkflowsQuery } from '@graphql/internal/client/generated/listWorkflows.generated';
import { useSetWorkflowVisibilityMutation } from '@graphql/internal/client/generated/setWorkflowVisibility.generated';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected } from '@lib/types/AuthMethod';
import { DeleteSharp, EditSharp, LinkSharp } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import { DataGrid } from '@mui/x-data-grid';

dayjs.extend(duration);

const WorkflowsPage: NextPage = withConnectionRequired(() => {
  const router = useRouter();
  const { authMethod } = useContext(authContext);

  const { data, loading, refetch } = useListWorkflowsQuery({ skip: isDisconnected(authMethod) });

  const [remove] = useDeleteWorkflowMutation();
  const [setVisibility] = useSetWorkflowVisibilityMutation();

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
              flex: 0.7,
              headerName: 'Workflow ID',
              type: 'string',
              sortable: false,
              filterable: false,
              // align: 'right',
            },
            {
              field: 'public',
              flex: 0.1,
              headerName: 'Public',
              type: 'boolean',
              sortable: false,
              filterable: false,
              align: 'center',
              renderCell: (params) => (
                <Checkbox
                  checked={params.row.public}
                  onChange={async (_, checked) => {
                    await setVisibility({ variables: { workflowId: params.row._id, isPublic: checked } });
                    await refetch();
                  }}
                />
              ),
            },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 0.2,
              renderCell: (params) => (
                <div className="flex justify-center content-center">
                  <Fab
                    color="primary"
                    className="m-1"
                    aria-label="copy"
                    size="small"
                    onClick={() => {
                      copy(`${process.env.NEXT_PUBLIC_APP_URL}/sandbox?workflowId=${params.row._id}`);
                    }}
                  >
                    <LinkSharp />
                  </Fab>
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
                      await refetch();
                    }}
                  >
                    <DeleteSharp />
                  </Fab>
                </div>
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          autoHeight
          rowHeight={55}
          rows={data?.listWorkflows ?? []}
          getRowId={(row) => row._id}
          className="shadow-lg bg-white"
          isRowSelectable={() => false}
        ></DataGrid>
      </div>
    </>
  );
});

export default WorkflowsPage;
