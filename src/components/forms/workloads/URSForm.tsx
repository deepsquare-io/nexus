// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import LabelSubform from '@components/forms/LabelSubform';
import TextField from '@components/forms/fields/TextField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import Grid from '@mui/material/Grid';

function URSForm() {
  const { control } = useFormContext<WorkloadFormData>();
  const [simpleMode, setSimpleMode] = useState<boolean>(true);

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

export default URSForm;
