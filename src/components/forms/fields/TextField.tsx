// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import type ControlledFieldProps from '@components/forms/fields/ControlledFieldProps';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';

export interface TextFieldProps<V extends FieldValues, N extends FieldPath<V>>
  extends ControlledFieldProps<MuiTextFieldProps, V, N> {}

/**
 * Render a controlled MUI {@link MuiTextField}; it has to be linked with a RHF controller.
 */
export default function TextField<V extends FieldValues = FieldValues, N extends FieldPath<V> = FieldPath<V>>({
  control,
  rules,
  shouldUnregister,
  name,
  ...props
}: TextFieldProps<V, N>) {
  const state = useFormState({ control, name });
  const { invalid, error } = control.getFieldState(name, state);

  return (
    <MuiTextField
      {...props}
      error={invalid}
      helperText={invalid && error?.message ? error.message : props.helperText}
      InputProps={{ ...control.register(name, rules as RegisterOptions<V, N>), ...props.InputProps }}
    />
  );
}
