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
