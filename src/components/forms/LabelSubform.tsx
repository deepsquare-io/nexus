// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import TextField from '@components/forms/fields/TextField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MuiTextField from '@mui/material/TextField';

const LabelSubform = () => {
  const { control, register } = useFormContext<WorkloadFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: 'labels' });
  const [extraKey, setExtraKey] = useState<string>('');
  const [extraValue, setExtraValue] = useState<string>('');

  return (
    <Grid item xs={2}>
      <div className="flex flex-col">
        <h2 className="m-0 font-medium">Labels</h2>

        <div className="flex flex-col">
          {fields.map((field, index) => {
            return (
              <div key={`labels.${index}`} className="flex">
                <TextField
                  className="mr-5"
                  control={control}
                  disabled
                  label="Key"
                  {...register(`labels.${index}.key`)}
                />
                <TextField
                  className="mr-4"
                  control={control}
                  disabled
                  label="Value"
                  {...register(`labels.${index}.value`)}
                />
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <RemoveCircle />
                </IconButton>
              </div>
            );
          })}
        </div>
        <div key="add-vars" className="flex">
          <MuiTextField
            className="mr-5"
            name="key"
            placeholder="Key"
            value={extraKey}
            onChange={(event) => setExtraKey(event.target.value)}
          />
          <MuiTextField
            className="mr-4"
            name="value"
            placeholder="Value"
            value={extraValue}
            onChange={(event) => setExtraValue(event.target.value)}
          />
          <IconButton
            onClick={() => {
              if (extraKey === '' || extraValue === '') return;
              append({ key: extraKey, value: extraValue });
              setExtraKey('');
              setExtraValue('');
            }}
          >
            <AddCircle />
          </IconButton>
        </div>
      </div>
    </Grid>
  );
};

export default LabelSubform;
