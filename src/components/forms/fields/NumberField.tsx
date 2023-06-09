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
