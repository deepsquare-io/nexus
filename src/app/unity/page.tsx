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
import NumberField from '@components/forms/fields/NumberField';
import URSForm from '@components/forms/workloads/URSForm';
import CustomLink from '@components/routing/Link';
import Card from '@components/ui/containers/Card/Card';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2 } from '@lib/types/AuthMethod';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import WorkloadType from '@lib/types/enums/WorkloadType';
import Grid from '@mui/material/Grid';
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
    type: y.mixed<WorkloadType>().oneOf([WorkloadType.URS]),
    labels: y.array().of(
      y.object().shape({
        key: y.string().required(),
        value: y.string().required(),
      }),
    ),
    details: y.object().shape({
      archiveLink: y.string().required(),
      binaryPath: y.string().required(),
      additionalArgs: y.string().notRequired(),
      gpuPerTask: y.number().integer().min(0).max(2),
      cpuPerTask: y.number().integer().min(0).max(16),
      memPerCpu: y
        .number()
        .integer()
        .min(0)
        .max(120 * 1024),
    }),
  });
};

const UnityPage: NextPage = () => {
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();
  const { authMethod } = useContext(authContext);

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.URS,
      credit: formatWei(275n).toString(),
      labels: [],
      jobName: `${WorkloadType.URS} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
      details: {
        nTasks: 1,
        gpuPerTask: 1,
        cpuPerTask: 4,
        memPerCpu: 4096,
        binaryPath: '',
        archiveLink: '',
        additionalArgs: '-webserverurl "wss://tdp.deepsquare.run:443" --logFile -',
      },
    },
    resolver: yupResolver(schema(balance_wCredit, minAmount ?? 0n, isWeb2(authMethod))),
  });

  const { handleSubmit, control, watch } = methods;

  const { handleJob } = useHandleJob(watch('credit').toString(), watch('jobName'));

  const onSubmit: SubmitHandler<CreditSubformData & WorkloadFormData> = async ({ type, details }) => {
    await handleJob(await resolveJobForm(type, details));
  };

  return (
    <FormProvider {...methods}>
      <form className="flew grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grow space-y-10">
          <Card className="flex flex-col grow p-8" title="Unity Render Streaming">
            <div className="pt-5">
              <p>
                <CustomLink
                  href="https://docs.unity3d.com/Packages/com.unity.renderstreaming@3.1/manual/index.html"
                  target="_blank"
                ></CustomLink>
                Unity Render Streaming is a solution that provides Unity's high quality rendering abilities via browser.
                It's designed to meet the needs of tasks like viewing car configurators or architectural models on
                mobile devices. This solution's streaming technology takes advantage of{' '}
                <CustomLink href="https://webrtc.org/" target="_blank">
                  WebRTC
                </CustomLink>
                , and developers can even use the{' '}
                <CustomLink href="https://docs.unity3d.com/Packages/com.unity.webrtc@latest" target="_blank">
                  WebRTC package
                </CustomLink>{' '}
                to create their own unique solutions.
              </p>
            </div>
          </Card>
          <Card className="flex flex-col grow p-8" title="Application Setup">
            <URSForm />
          </Card>
          <Card className="flex flex-col grow p-8" title="Hardware">
            <Grid className="pt-5" container spacing={2.5} columns={2}>
              <Grid item xs={1}>
                <h4 className="m-0 font-normal">GPU(s)</h4>
                <NumberField name="details.gpuPerTask" control={control} type="number" min={1} />
              </Grid>
              <Grid item xs={1}>
                <h4 className="m-0 font-normal">CPU(s)</h4>
                <NumberField name="details.cpuPerTask" control={control} type="number" min={1} />
              </Grid>
              <Grid item xs={1}>
                <h4 className="m-0 font-normal">Memory (MB) per CPU</h4>
                <NumberField name="details.memPerCpu" control={control} type="number" min={1024} />
              </Grid>
            </Grid>
          </Card>
          <CreditSubform
            gpuQty={watch('details.gpuPerTask')}
            cpuQty={watch('details.cpuPerTask')}
            memQty={watch('details.cpuPerTask')! * watch('details.memPerCpu')!}
          />
          <SendButton>Render</SendButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UnityPage;
