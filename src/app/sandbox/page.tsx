'use client';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { ContentErrors } from 'vanilla-jsoneditor';
import * as y from 'yup';
import { memo, useEffect, useState } from 'react';
import SendButton from '@components/buttons/SendButton';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import CreditSubform from '@components/forms/CreditSubform';
import CustomLink from '@components/routing/Link';
import Card from '@components/ui/containers/Card/Card';
import type { Job } from '@graphql/sbatchServiceClient/generated/Types';
import { useSubmitMutation } from '@graphql/sbatchServiceClient/generated/createJob.generated';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import WorkloadType from '@lib/types/enums/WorkloadType';
import formatCredit from '@utils/format/formatCredit';

const JsonEditor = dynamic(() => import('@components/ui/containers/JsonEditor/JsonEditor'), { ssr: false });

const MemoJsonEditor = memo(JsonEditor, (prev, next) => JSON.stringify(prev) == JSON.stringify(next));

const schema = (maxAmount: bigint, minAmount: bigint) => {
  return y.object().shape({
    jobName: y.string().required().max(32),
    credit: y
      .string()
      .required()
      .test('exceed-balance', 'Credit allocation exceeds your balance', (value) => BigInt(value) < maxAmount)
      .test(
        'subceed-min-amount',
        `Credit allocation is lower than ${formatCredit(minAmount)} credits`,
        (value) => BigInt(value) > minAmount,
      ),
    type: y.mixed<WorkloadType>().oneOf(Object.values(WorkloadType)).required(),
  });
};

type Content = { json: Job } | { text: string };

function isJson(content: Content): content is { json: Job } {
  return (content as { json: Job }).json !== undefined;
}

const SandboxPage: NextPage = () => {
  const defaultJob: Job = {
    resources: {
      tasks: 1,
      gpusPerTask: 0,
      cpusPerTask: 1,
      memPerCpu: 1024,
    },
    enableLogging: true,
    steps: [
      {
        name: 'hello world',
        run: {
          command: `echo \"Hello World\"`,
        },
      },
    ],
  };

  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();

  const [content, setContent] = useState<Content>(() => {
    if (typeof window === 'undefined') return { text: JSON.stringify(defaultJob) };
    const storedContent = localStorage.getItem('userContent');
    return storedContent ? (JSON.parse(storedContent) as Content) : { text: JSON.stringify(defaultJob) };
  });
  let json: any;

  try {
    json = isJson(content) ? content.json : JSON.parse(content.text);
  } catch (e) {
    json = defaultJob;
  }

  const [jsonErrors, setJsonErrors] = useState<ContentErrors>({ validationErrors: [] });
  const [submit] = useSubmitMutation();

  useEffect(() => {
    localStorage.setItem('userContent', JSON.stringify(content));
  }, [content]);

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.SANDBOX,
      credit: '1000',
      jobName: `${WorkloadType.SANDBOX} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n)),
  });

  const { handleSubmit, watch } = methods;

  const { handleJob } = useHandleJob(
    watch('credit').toString(),
    watch('jobName'),
    json.output
      ? json.output.s3
        ? 2
        : json.output.http
        ? json.output.http.url === 'https://transfer.deepsquare.run/'
          ? 0
          : 1
        : 4
      : 4,
    json?.resources?.cpusPerTask,
    json?.resources?.tasks,
    json?.resources?.gpusPerTask,
    json?.resources?.memPerCpu,
  );

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async () => {
    if (jsonErrors && 'validationErrors' in jsonErrors && jsonErrors.validationErrors.length > 0) {
      toast.error('Invalid JSON');
      return;
    }

    await submit({ variables: { job: json } }).then(async (jobDefinition) => {
      if (jobDefinition.data?.submit) {
        await handleJob(jobDefinition.data.submit);
      }
    });
  };

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
          <Card className="flex flex-col grow p-8" title="Write your workflow file">
            <div className="pt-5">
              <MemoJsonEditor
                content={content}
                onChange={(
                  newContent: Content,
                  previousContent: Content,
                  { contentErrors }: { contentErrors: ContentErrors },
                ) => {
                  setJsonErrors(contentErrors);
                  setContent(newContent);
                }}
              />
            </div>
          </Card>

          <CreditSubform
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
        </div>
      </form>
    </FormProvider>
  );
};

export default SandboxPage;
