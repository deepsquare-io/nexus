'use client';

import randomWords from 'random-words';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as y from 'yup';
import { useContext, useState } from 'react';
import SendButton from '@components/buttons/SendButton';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import CreditSubform from '@components/forms/CreditSubform';
import NumberField from '@components/forms/fields/NumberField';
import NumberSlider from '@components/forms/fields/SliderField';
import BlenderForm from '@components/forms/workloads/BlenderForm';
import Card from '@components/ui/containers/Card/Card';
import { yupResolver } from '@hookform/resolvers/yup';
import useBalances from '@hooks/useBalances';
import useGetMinimumAmount from '@hooks/useGetMinimumAmount';
import useHandleJob from '@hooks/useHandleJob';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2 } from '@lib/types/AuthMethod';
import { StorageSchema } from '@lib/types/StorageData';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import BlenderOutputFormat from '@lib/types/enums/BlenderOutputFormat';
import BlenderRenderEngine from '@lib/types/enums/BlenderRenderEngine';
import BlenderVersion from '@lib/types/enums/BlenderVersion';
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
    type: y.mixed<WorkloadType>().oneOf([WorkloadType.BLENDER]),
    details: y.object().shape({
      version: y.string().required(),
      outputFormat: y.mixed<BlenderOutputFormat>().oneOf(Object.values(BlenderOutputFormat)).required(),
      renderEngine: y.mixed<BlenderRenderEngine>().oneOf(Object.values(BlenderRenderEngine)).required(),
      inputData: StorageSchema,
      outputData: StorageSchema,
      nTasks: y.number().integer().min(1).max(6),
    }),
  });
};

export default function BlenderPage() {
  const [advanced, setAdvanced] = useState<boolean>(false);
  const { balance_wCredit } = useBalances();
  const { data: minAmount } = useGetMinimumAmount();
  const { authMethod } = useContext(authContext);

  const methods = useForm<CreditSubformData & WorkloadFormData>({
    defaultValues: {
      type: WorkloadType.BLENDER,
      credit: formatWei(1200n).toString(),
      details: {
        version: BlenderVersion.v341,
        outputFormat: BlenderOutputFormat.PNG,
        renderEngine: BlenderRenderEngine.CYCLES,
        nTasks: 1,
        cpuPerTask: 8,
        memPerCpu: 6000,
        gpuPerTask: 1,
      },
      jobName: `${WorkloadType.BLENDER} - ${randomWords({ exactly: 3, maxLength: 4 })?.join(' ') ?? ''}`,
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
          <Card className="flex flex-col grow p-8" title="Blender Rendering">
            <div className="pt-5">
              <p>
                Rendering is the process of turning a 3D scene into a 2D image. Blender includes three render engines
                with different strengths:
                <ul>
                  <li>
                    <b>Cycles:</b> A physically-based renderer that can produce highly realistic images. It offers
                    advanced features such as ray-traced reflections, refractions, and volumetrics. Cycles is ideal for
                    creating photorealistic images and animations, but rendering times can be slower compared to Eevee.
                  </li>
                  <li>
                    <b>Workbench:</b> The default viewport render engine. It provides a quick and simple way to preview
                    the scene while working. It doesn't offer advanced lighting features or realistic materials, making
                    it best suited for fast playblasts or previews.
                  </li>
                  <li>
                    <b>Eevee:</b> A real-time renderer that provides fast and interactive rendering results. It is ideal
                    for creating stylized or cartoonish animations, as it offers advanced features such as volumetrics
                    and screen-space reflections. However, it may not provide the same level of realism as Cycles.
                  </li>
                </ul>
              </p>
            </div>
          </Card>
          <Card className="flex flex-col grow p-8" title="Application Setup">
            <BlenderForm />
          </Card>
          <Card className="flex flex-col grow p-8" title="Hardware">
            <Grid className="pt-5" container spacing={2.5} columns={2}>
              <Grid item xs={2}>
                <NumberSlider
                  name="details.nTasks"
                  control={control}
                  min={1}
                  max={4}
                  step={1}
                  defaultValue={1}
                  label="Number of tasks in parallel:"
                  tooltip="Resource allocation for 1 task: 1 GPU, 8 CPUs, 6GB RAM"
                />
                <p>Running more tasks in parallel can potentially lead to faster completion times.</p>
              </Grid>
              {advanced && (
                <>
                  <Grid item xs={1}>
                    <h4 className="m-0 font-normal">CPU per task</h4>
                    <NumberField name="details.cpuPerTask" control={control} type="number" defaultValue={4} />
                  </Grid>
                  <Grid item xs={1}>
                    <h4 className="m-0 font-normal">Memory per CPU (MB)</h4>
                    <NumberField
                      name="details.memPerCpu"
                      control={control}
                      type="number"
                      min={1024}
                      defaultValue={4096}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <div
              className="mt-4 text-primary font-bold hover:cursor-pointer col-start-1"
              onClick={() => setAdvanced(!advanced)}
            >
              {advanced ? 'Simple mode' : 'Advanced mode'}
            </div>
          </Card>
          <CreditSubform
            gpuQty={watch('details.nTasks')}
            cpuQty={watch('details.nTasks')! * watch('details.cpuPerTask')!}
            memQty={watch('details.nTasks')! * watch('details.cpuPerTask')! * watch('details.memPerCpu')!}
          />
          <SendButton>Render</SendButton>
        </div>
      </form>
    </FormProvider>
  );
}
