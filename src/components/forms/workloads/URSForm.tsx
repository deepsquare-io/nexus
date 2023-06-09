import { useFormContext } from 'react-hook-form';
import TextField from '@components/forms/fields/TextField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import Grid from '@mui/material/Grid';

function URSForm() {
  const { control } = useFormContext<WorkloadFormData>();

  return (
    <>
      <Grid className="pt-5" container spacing={2.5} columns={2}>
        <Grid item xs={1}>
          <h4 className="m-0 font-normal">Unity archive link</h4>
          <TextField name="details.archiveLink" control={control} />
        </Grid>
        <Grid item xs={1}>
          <h4 className="m-0 font-normal">Binary path within archive</h4>
          <TextField name="details.binaryPath" control={control} />
        </Grid>
        <Grid item xs={2}>
          <h4 className="m-0 font-normal">Arguments</h4>
          <TextField name="details.additionalArgs" multiline minRows={3} control={control} />
        </Grid>
      </Grid>
    </>
  );
}

export default URSForm;
