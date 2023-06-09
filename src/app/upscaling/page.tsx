'use client';

import type { NextPage } from 'next';
import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as y from 'yup';
import SendButton from '@components/buttons/SendButton';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import CreditSubform from '@components/forms/CreditSubform';
import UpscalingForm from '@components/forms/workloads/UpscalingForm';
import CustomLink from '@components/routing/Link';
import Card from '@components/ui/containers/Card/Card';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import { StorageSchema } from '@lib/types/StorageData';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import StorageType from '@lib/types/enums/StorageType';
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
    type: y.mixed<WorkloadType>().oneOf([WorkloadType.UPSCALING]),
    details: y.object().shape({
      isAnime: y.boolean().required(),
      isVideo: y.boolean().required(),
      inputData: StorageSchema,
      outputData: StorageSchema,
    }),
  });
};

const NewPage: NextPage = () => {
  const [create] = useResolveJobForm();
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.UPSCALING,
      jobName: `${WorkloadType.UPSCALING} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
      credit: '1000',
      details: {
        nTasks: 1,
        gpuPerTask: 1,
        cpuPerTask: 8,
        memPerCpu: 8000,
        isVideo: false,
        isAnime: false,
      },
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n)),
  });

  const { handleSubmit, watch } = methods;

  const { handleJob } = useHandleJob(
    watch('credit'),
    watch('jobName'),
    0,
    watch('details.cpuPerTask'),
    watch('details.nTasks'),
    watch('details.gpuPerTask'),
    watch('details.memPerCpu'),
  );

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async ({ type, details }) => {
    if (details.inputData?.type === StorageType.DRAG_DROP) {
      const data = new FormData();
      data.append('file', details.inputData.dragAndDropFile!);
      details.inputData.type = StorageType.HTTP;
      details.inputData.url = (
        await (
          await toast.promise(
            fetch('https://transfer.deepsquare.run/', {
              method: 'POST',
              body: data,
            }),
            {
              pending: 'Uploading your file...',
              success: 'File successfully uploaded',
              error: 'Error while uploading your file',
            },
          )
        ).text()
      ).replace('\n', '');
    }
    if (details.outputData?.type === StorageType.DEEPSQUARE) {
      details.outputData.type = StorageType.HTTP;
      details.outputData.url = 'https://transfer.deepsquare.run/';
    }
    details.nTasks = details.isVideo ? 4 : 1;
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
          <Card className="flex flex-col grow p-8" title="Upscaling">
            <div className="pt-5">
              AI Upscaling is the process of transforming low resolution images or videos to a higher resolution by
              using specialised AI models (in this example we use{' '}
              <CustomLink href="https://github.com/xinntao/Real-ESRGAN" target="_blank">
                Real-ESRGAN
              </CustomLink>
              , model optimised for image restoration) to intelligently insert additional pixels resulting in sharper
              images.
            </div>
          </Card>
          <Card className="flex flex-col grow p-8" title="Upload your media">
            <UpscalingForm />
          </Card>
          <CreditSubform
            defaultDuration={(watch('details.isVideo') as unknown as string) === 'true' ? 20 : 7}
            gpuQty={(watch('details.isVideo') as unknown as string) === 'true' ? 4 : 1}
            cpuQty={(watch('details.isVideo') as unknown as string) === 'true' ? 32 : 8}
            memQty={(watch('details.isVideo') as unknown as string) === 'true' ? 256000 : 64000}
          />
          <SendButton>Upscale</SendButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPage;
