// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useFormContext } from 'react-hook-form';
import StorageSubform from '@components/forms/StorageSubform';
import SelectorField from '@components/forms/fields/SelectorField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import BlenderOutputFormat from '@lib/types/enums/BlenderOutputFormat';
import BlenderRenderEngine from '@lib/types/enums/BlenderRenderEngine';
import BlenderVersion from '@lib/types/enums/BlenderVersion';
import StorageType from '@lib/types/enums/StorageType';
import Grid from '@mui/material/Grid';

function BlenderForm() {
  const { control } = useFormContext<WorkloadFormData>();

  return (
    <>
      <Grid className="pt-5" container spacing={2.5} columns={2}>
        <Grid item xs={1}>
          <h4 className="m-0 font-normal">Blender version</h4>
          <SelectorField
            name="details.version"
            control={control}
            options={Object.values(BlenderVersion)}
          ></SelectorField>
        </Grid>
        <Grid item xs={1}>
          <h4 className="m-0 font-normal">Output format</h4>
          <SelectorField
            name="details.outputFormat"
            control={control}
            options={Object.values(BlenderOutputFormat)}
          ></SelectorField>
        </Grid>
        <Grid item xs={1}>
          <h4 className="m-0 font-normal">Render engine</h4>
          <SelectorField
            name="details.renderEngine"
            control={control}
            options={Object.values(BlenderRenderEngine)}
          ></SelectorField>
        </Grid>
      </Grid>
      <StorageSubform input={{ defaultType: StorageType.DRAG_DROP }} output={{ defaultType: StorageType.DEEPSQUARE }} />
    </>
  );
}

export default BlenderForm;
