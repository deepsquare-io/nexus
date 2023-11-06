// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import LabelSubform from '@components/forms/LabelSubform';
import StorageSubform from '@components/forms/StorageSubform';
import SelectorField from '@components/forms/fields/SelectorField';
import TextField from '@components/forms/fields/TextField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import StorageType from '@lib/types/enums/StorageType';
import TextToImageModel from '@lib/types/enums/TextToImageModel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function TextToImageForm() {
  const { control } = useFormContext<WorkloadFormData>();
  const [simpleMode, setSimpleMode] = useState<boolean>(true);

  return (
    <>
      <StorageSubform
        input={{ defaultType: StorageType.DRAG_DROP, disable: true }}
        output={{ defaultType: StorageType.DEEPSQUARE, noChoice: true }}
      />

      <Grid className="pt-5" container spacing={2.5} columns={2}>
        <Grid item xs={2}>
          <TextField
            name="details.tti"
            className="grow"
            control={control}
            multiline
            rows={5}
            placeholder="Portrait photo of a warrior chief, tribal make up, blue on red, side profile, looking away, serious eyes, 50mm portrait photography, hard rim lighting photography bestquality"
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <h2 className="font-medium m-0 mt-4">Select the parameters</h2>
          <SelectorField
            name="details.ttiModel"
            className="grow"
            control={control}
            options={Object.values(TextToImageModel)}
          ></SelectorField>
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
            <Grid item xs={1}>
              <h4 className="m-0 font-normal">Steps</h4>
              <TextField name="details.steps" control={control}></TextField>
            </Grid>
            <Grid item xs={2}>
              <div className="p-[11px]">
                Height
                <Controller
                  name="details.height"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value="768" control={<Radio />} label="768" />
                      <FormControlLabel value="1024" control={<Radio />} label="1024" />
                    </RadioGroup>
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="p-[11px]">
                Width
                <Controller
                  name="details.width"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value="768" control={<Radio />} label="768" />
                      <FormControlLabel value="1024" control={<Radio />} label="1024" />
                    </RadioGroup>
                  )}
                />
              </div>
            </Grid>
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
      </Grid>
    </>
  );
}

export default TextToImageForm;
