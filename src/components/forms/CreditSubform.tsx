import { useFormContext } from 'react-hook-form';
import type { FC } from 'react';
import { useContext } from 'react';
import TextField from '@components/forms/fields/TextField';
import Card from '@components/ui/containers/Card/Card';
import type { HardwareRecapProps } from '@components/ui/containers/HardwareRecap/HardwareRecap';
import HardwareRecap from '@components/ui/containers/HardwareRecap/HardwareRecap';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import Grid from '@mui/material/Grid';

export interface CreditSubformData {
  jobName: string;
  credit: string;
}

const CreditSubform: FC<HardwareRecapProps> = ({ defaultDuration, gpuQty, cpuQty, memQty }) => {
  const { control } = useFormContext<CreditSubformData>();
  const { authMethod } = useContext(authContext);

  return (
    <Card className="flex flex-col grow p-8" title="Payment">
      <Grid className="pt-5" container spacing={2.5} columns={1}>
        <Grid item xs={1}>
          <h4 className="m-0 font-semibold">Job Name</h4>
          <TextField
            name="jobName"
            control={control}
            helperText="Limited to 32 characters"
            inputProps={{ maxLength: 31 }}
          />
        </Grid>
        {isWeb3(authMethod) && (
          <Grid item xs={1}>
            <HardwareRecap defaultDuration={defaultDuration} gpuQty={gpuQty} cpuQty={cpuQty} memQty={memQty} />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default CreditSubform;
