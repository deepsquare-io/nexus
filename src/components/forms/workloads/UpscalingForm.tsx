import { Controller, useFormContext } from 'react-hook-form';
import StorageSubform from '@components/forms/StorageSubform';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import StorageType from '@lib/types/enums/StorageType';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function UpscalingForm() {
  const { control } = useFormContext<WorkloadFormData>();

  return (
    <>
      <Grid className="pt-5" container spacing={2.5} columns={2}>
        <Grid item xs={2}>
          <StorageSubform
            input={{ defaultType: StorageType.DRAG_DROP, noChoice: true }}
            output={{ defaultType: StorageType.DEEPSQUARE, noChoice: true }}
          />
          <h2 className="font-medium m-0 mt-4">Select the parameters</h2>
          <Grid item xs={2}>
            <div className="p-[11px]">
              <Controller
                name="details.isVideo"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel value={false} control={<Radio />} label="Image" />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Video (only first 5 min will be upscaled)"
                    />
                  </RadioGroup>
                )}
              />
            </div>
            <div>
              <Controller
                name="details.isAnime"
                control={control}
                render={({ field: props }) => <Checkbox {...props} checked={!!props.value} />}
              />
              Anime / cartoon style
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default UpscalingForm;
