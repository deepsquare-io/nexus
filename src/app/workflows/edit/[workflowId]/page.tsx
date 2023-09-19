'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import WorkflowForm from '@components/forms/workflows/WorkflowForm';
import { useGetWorkflowQuery } from '@graphql/internal/client/generated/getWorkflow.generated';

const EditWorkflowPage = ({ params }: { params: { workflowId: string } }) => {
  const { data } = useGetWorkflowQuery({ variables: { workflowId: params.workflowId } });

  if (!data || !data.getWorkflow) return null;
  return (
    <WorkflowForm workflowId={params.workflowId} name={data.getWorkflow.name} content={data.getWorkflow.content} />
  );
};

export default EditWorkflowPage;
