// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useController } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import type { TextFieldProps } from '@components/forms/fields/TextField';
import type { AutocompleteProps } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import MuiTextField from '@mui/material/TextField';

type SelectorFieldProps<V extends FieldValues, N extends FieldPath<V>> = Omit<TextFieldProps<V, N>, 'rules'> & {
  options: any[];
  AutocompleteProps?: Omit<
    AutocompleteProps<V, undefined, boolean, undefined>,
    'readOnly' | 'disabled' | 'options' | 'value' | 'onBlur' | 'onChange' | 'renderOption' | 'renderInput'
  >;
};

/**
 * Render a **controlled** country selector based on MUI {@link Autocomplete}; it has to be linked with a RHF controller.
 */
const SelectorField = <V extends FieldValues = FieldValues, N extends FieldPath<V> = FieldPath<V>>({
  options,
  // Controller
  control,
  shouldUnregister,
  name,
  // ControlledTextField
  readOnly,
  disabled,
  AutocompleteProps,
  ...props
}: SelectorFieldProps<V, N>) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid },
  } = useController<V, N>({ control, shouldUnregister, name, defaultValue: options[0] });

  return (
    <Autocomplete<V, undefined, boolean, undefined>
      readOnly={readOnly}
      disabled={disabled}
      options={options}
      disableClearable
      value={value}
      onBlur={onBlur}
      onChange={(_, value) => {
        onChange(value);
      }}
      inputValue={value}
      onInputChange={(_, value) => onChange(value)}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          {...props}
          name={name}
          error={invalid}
          inputProps={{ ...params.inputProps, ...props.inputProps }}
          InputProps={{
            ...params.InputProps,
            ...props.InputProps,
          }}
        />
      )}
      {...AutocompleteProps}
    />
  );
};

export default SelectorField;
