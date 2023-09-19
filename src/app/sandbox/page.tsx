'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { ContentErrors } from 'vanilla-jsoneditor';
import * as y from 'yup';
import { useContext, useState } from 'react';
import SendButton from '@components/buttons/SendButton';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import CreditSubform from '@components/forms/CreditSubform';
import CustomLink from '@components/routing/Link';
import Card from '@components/ui/containers/Card/Card';
import type { Content } from '@components/ui/containers/WorkflowEditor/WorkflowEditor';
import WorkflowEditor from '@components/ui/containers/WorkflowEditor/WorkflowEditor';
import type { Job } from '@graphql/external/sbatchServiceClient/generated/Types';
import { useGetWorkflowQuery } from '@graphql/internal/client/generated/getWorkflow.generated';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import { defaultJob } from '@lib/constants';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2 } from '@lib/types/AuthMethod';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import WorkloadType from '@lib/types/enums/WorkloadType';
import formatCredit from '@utils/format/formatCredit';
import { formatWei } from '@utils/format/formatWei';

const schema = (maxAmount: bigint, minAmount: bigint, ignoreBalance: boolean) => {
  return y.object().shape({
    jobName: y.string().required().max(32),
    credit: y
      .string()
      .required()
      .test(
        'exceed-balance',
        'Credit allocation exceeds your balance',
        (value) => BigInt(value) < maxAmount || ignoreBalance,
      )
      .test(
        'subceed-min-amount',
        `Credit allocation is lower than ${formatCredit(minAmount)} credits`,
        (value) => BigInt(value) > minAmount,
      ),
    type: y.mixed<WorkloadType>().oneOf(Object.values(WorkloadType)).required(),
  });
};

function isJson(content: Content): content is { json: Job } {
  return (content as { json: Job }).json !== undefined;
}

const SandboxPage: NextPage = () => {
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();
  const { authMethod } = useContext(authContext);
  const searchParams = useSearchParams();
  const workflowId = searchParams.get('workflowId');
  const [content, setContent] = useState<Content>({ text: '' });

  const { data } = useGetWorkflowQuery({ variables: { workflowId: workflowId! }, skip: !workflowId });

  let json: any;

  try {
    json = isJson(content) ? content.json : JSON.parse(content.text);
  } catch (e) {
    json = defaultJob;
  }

  const [jsonErrors, setJsonErrors] = useState<ContentErrors>({ validationErrors: [] });

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.SANDBOX,
      credit: formatWei(5000n).toString(),
      jobName: `${WorkloadType.SANDBOX} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n, isWeb2(authMethod))),
  });

  const { handleSubmit, watch } = methods;

  const { handleJob } = useHandleJob(watch('credit').toString(), watch('jobName'));

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async () => {
    if (jsonErrors && 'validationErrors' in jsonErrors && jsonErrors.validationErrors.length > 0) {
      toast.error('Invalid JSON');
      return;
    }

    await handleJob(json);
  };

  //TODO: add loading state awaiting for get workflow query if necessary

  return (
    <FormProvider {...methods}>
      <form className="flew grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grow space-y-10">
          <Card className="flex flex-col grow p-8" title="Workflow">
            <div className="pt-5">
              <p>
                Leverage the full power of DeepSquare's HPC capabilities by using workflow files to define resource
                allocation and execution instructions for a diverse array of tasks. To learn how to write effective
                workflow files, consult the{' '}
                <CustomLink href="https://docs.deepsquare.run/workflow/getting-started/part-2" target="_blank">
                  documentation
                </CustomLink>{' '}
                and the{' '}
                <CustomLink href="https://github.com/deepsquare-io/workflow-catalog" target="_blank">
                  Workflow catalog
                </CustomLink>
                .
              </p>
            </div>
          </Card>
          <WorkflowEditor
            cacheKey={workflowId ? `sandbox-${workflowId}` : 'sandbox'}
            defaultContent={data?.getWorkflow ? data.getWorkflow.content : JSON.stringify(defaultJob)}
            onContentChange={(newContent, contentErrors) => {
              setContent(newContent);
              setJsonErrors(contentErrors);
            }}
          />

          <CreditSubform
            defaultDuration={20}
            gpuQty={
              json?.resources?.tasks && json?.resources?.gpusPerTask
                ? json.resources.tasks * json.resources.gpusPerTask
                : undefined
            }
            cpuQty={
              json?.resources?.tasks && json?.resources?.cpusPerTask
                ? json.resources.tasks * json.resources.cpusPerTask
                : undefined
            }
            memQty={
              json?.resources?.tasks && json?.resources?.cpusPerTask && json?.resources?.memPerCpu
                ? json.resources.tasks * json.resources.cpusPerTask * json.resources.memPerCpu
                : undefined
            }
          />
          <SendButton>Submit</SendButton>
          {/*{(!data ||*/}
          {/*  (isWeb2(authMethod) && data?.getWorkflow?.userId === authMethod.sub) ||*/}
          {/*  (isWeb3(authMethod) && data?.getWorkflow?.userId === authMethod.sub)) && (*/}
          {/*  <LoadingButton*/}
          {/*    loading={loading && saveLoading}*/}
          {/*    onClick={async () => {*/}
          {/*      await save({*/}
          {/*        variables: {*/}
          {/*          content: isJson(store.content) ? JSON.stringify(store.content.json) : store.content.text,*/}
          {/*          workflowId,*/}
          {/*        },*/}
          {/*      });*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Save*/}
          {/*  </LoadingButton>*/}
          {/*)}*/}
        </div>
      </form>
    </FormProvider>
  );
};

export default SandboxPage;
