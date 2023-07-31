'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { NextPage } from 'next';
import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as y from 'yup';
import { useContext } from 'react';
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
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2 } from '@lib/types/AuthMethod';
import { StorageSchema } from '@lib/types/StorageData';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import WorkloadType from '@lib/types/enums/WorkloadType';
import formatCredit from '@utils/format/formatCredit';
import { formatWei } from '@utils/format/formatWei';
import { resolveJobForm } from '@utils/resolveJobForm';

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
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();
  const { authMethod } = useContext(authContext);

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.UPSCALING,
      jobName: `${WorkloadType.UPSCALING} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
      credit: formatWei(4000n).toString(),
      details: {
        nTasks: 1,
        gpuPerTask: 1,
        cpuPerTask: 8,
        memPerCpu: 8000,
        isVideo: false,
        isAnime: false,
      },
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n, isWeb2(authMethod))),
  });

  const { handleSubmit, watch } = methods;

  const { handleJob } = useHandleJob(watch('credit'), watch('jobName'));

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async ({ type, details }) => {
    details.nTasks = details.isVideo ? 4 : 1;
    await handleJob(await resolveJobForm(type, details));
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
