// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as y from 'yup';
import type { FC } from 'react';
import SendButton from '@components/buttons/SendButton';
import TextField from '@components/forms/fields/TextField';
import WorkflowEditor from '@components/ui/containers/WorkflowEditor/WorkflowEditor';
import { useSaveWorkflowMutation } from '@graphql/internal/client/generated/saveWorkflow.generated';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultJob } from '@lib/constants';
import { isText } from '@lib/types/Content';

const schema = () => {
  return y.object().shape({
    workflowId: y.string().optional(),
    name: y.string().required(),
    content: y.string().required(),
  });
};

export interface WorkflowFormProps {
  name: string;
  content?: string;
  workflowId?: string;
}

export interface WorkflowFormData {
  name: string;
  content: string;
  workflowId?: string;
}

const WorkflowForm: FC<WorkflowFormProps> = ({
  workflowId,
  name: defaultName,
  content: defaultContent = JSON.stringify(defaultJob),
}) => {
  const [save] = useSaveWorkflowMutation();

  const methods = useForm<WorkflowFormData>({
    defaultValues: {
      workflowId,
      name: defaultName,
      content: defaultContent,
    },
    resolver: yupResolver(schema()),
  });

  const onSubmit: SubmitHandler<WorkflowFormData> = async ({ workflowId, name, content }) => {
    await save({ variables: { workflowId, name, content } });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextField name="name" control={methods.control} />

        <WorkflowEditor
          cacheKey={workflowId ? `edit-workflow-${workflowId}` : 'new-workflow'}
          defaultContent={defaultContent}
          onContentChange={(newContent, contentErrors) => {
            methods.setValue('content', isText(newContent) ? newContent.text : JSON.stringify(newContent.json));
            if ('validationErrors' in contentErrors && contentErrors.validationErrors.length > 0)
              methods.setError('content', { message: 'Invalid workflow' });
          }}
        />
      </form>
      <SendButton>Save</SendButton>
    </FormProvider>
  );
};

export default WorkflowForm;
