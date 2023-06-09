'use client';

import type { NextPage } from 'next';
import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as y from 'yup';
import SendButton from '@components/buttons/SendButton';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import CreditSubform from '@components/forms/CreditSubform';
import TextToImageForm from '@components/forms/workloads/TextToImageForm';
import CustomLink from '@components/routing/Link';
import Card from '@components/ui/containers/Card/Card';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import StorageType from '@lib/types/enums/StorageType';
import TextToImageModel from '@lib/types/enums/TextToImageModel';
import WorkloadType from '@lib/types/enums/WorkloadType';
import formatCredit from '@utils/format/formatCredit';
import useResolveJobForm from '@utils/useResolveJobForm';

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
    type: y.mixed<WorkloadType>().oneOf([WorkloadType.TEXTTOIMAGE]),
    details: y.object().shape({
      tti: y.string().required('Oops! Looks like you forgot to write a prompt before submitting your request.'),
    }),
  });
};

const TextToImagePage: NextPage = () => {
  const [create] = useResolveJobForm();
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.TEXTTOIMAGE,
      credit: '1000',
      jobName: `${WorkloadType.TEXTTOIMAGE} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
      details: {
        nTasks: 4,
        gpuPerTask: 1,
        cpuPerTask: 8,
        memPerCpu: 8000,
        ttiModel: TextToImageModel['sd-2-1'],
        steps: '150',
        height: '768',
        width: '768',
      },
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n)),
  });

  const { handleSubmit, watch } = methods;

  const { handleJob } = useHandleJob(
    watch('credit').toString(),
    watch('jobName'),
    0,
    watch('details.cpuPerTask'),
    watch('details.nTasks'),
    watch('details.gpuPerTask'),
    watch('details.memPerCpu'),
  );

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async ({ type, details }) => {
    if (details.outputData?.type === StorageType.DEEPSQUARE) {
      details.outputData.type = StorageType.HTTP;
      details.outputData.url = 'https://transfer.deepsquare.run/';
    }
    await create(type, details).then(async (jobDefinition) => {
      if (jobDefinition.data?.submit) {
        await handleJob(jobDefinition.data.submit);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="flew grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grow space-y-10">
          <Card className="flex flex-col grow p-8" title="Text to Image">
            <div className="pt-5">
              <p>
                Text to Image is a generative AI system that can create realistic images and art from descriptions in
                natural language. <br />
                We currently support two models:{' '}
                <CustomLink href="https://huggingface.co/stabilityai/stable-diffusion-2-1" target="_blank">
                  Stable Diffusion v2.1
                </CustomLink>{' '}
                and{' '}
                <CustomLink href="https://huggingface.co/hakurei/waifu-diffusion" target="_blank">
                  Waifu Diffusion v1.4
                </CustomLink>
                .
              </p>
            </div>
          </Card>
          <Card className="flex flex-col grow p-8" title="Describe what you would like to see">
            <TextToImageForm />
          </Card>
          <CreditSubform
            defaultDuration={10}
            gpuQty={watch('details.nTasks')}
            cpuQty={watch('details.nTasks')! * watch('details.cpuPerTask')!}
            memQty={watch('details.nTasks')! * watch('details.cpuPerTask')! * watch('details.memPerCpu')!}
          />
          <SendButton>Generate</SendButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default TextToImagePage;
