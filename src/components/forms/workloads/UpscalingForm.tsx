// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import LabelSubform from '@components/forms/LabelSubform';
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
  const [simpleMode, setSimpleMode] = useState<boolean>(true);

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
      {simpleMode && (
        <Grid className="pt-4" item xs={2}>
          <div className="mt-4 text-primary font-bold hover:cursor-pointer" onClick={() => setSimpleMode(false)}>
            Show Advanced Mode
          </div>
        </Grid>
      )}
      {!simpleMode && (
        <>
          <LabelSubform />
          <Grid className="pt-4" item xs={2}>
            <div
              className="mt-4 text-primary font-bold hover:cursor-pointer col-start-1"
              onClick={() => setSimpleMode(true)}
            >
              Hide Advanced Mode
            </div>
          </Grid>
        </>
      )}
    </>
  );
}

export default UpscalingForm;
