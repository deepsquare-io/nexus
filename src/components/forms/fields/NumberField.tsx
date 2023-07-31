// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type ControlledFieldProps from '@components/forms/fields/ControlledFieldProps';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';

export interface NumberFieldProps<V extends FieldValues, N extends FieldPath<V>>
  extends ControlledFieldProps<MuiTextFieldProps, V, N> {
  min?: number;
  max?: number;
}

/**
 * Render a controlled MUI {@link MuiTextField}; it has to be linked with a RHF controller.
 */
export default function NumberField<
  V extends FieldValues = Record<string, number>,
  N extends FieldPath<V> = FieldPath<V>,
>({ control, rules, shouldUnregister, name, min, max, ...props }: NumberFieldProps<V, N>) {
  const {
    fieldState: { invalid, error },
  } = useController({ control, name, rules: { min, max } });

  return (
    <MuiTextField
      {...props}
      error={invalid}
      helperText={invalid && error?.message ? error.message : props.helperText}
      type="number"
      InputProps={{
        inputProps: {
          min: min,
          max: max,
          inputMode: 'numeric',
        },
        ...control.register(name, { valueAsNumber: true, ...rules } as RegisterOptions<V, N>),
        ...props.InputProps,
      }}
    />
  );
}
