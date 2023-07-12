// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import type { UseControllerProps } from 'react-hook-form/dist/types/controller';
import type { RegisterOptions } from 'react-hook-form/dist/types/validator';

type ControlledFieldProps<T, V extends FieldValues, N extends FieldPath<V>> = Omit<
  UseControllerProps<V, N>,
  'control' | 'rules'
> &
  Required<Pick<UseControllerProps<V, N>, 'control'>> &
  Omit<T, 'value'> & {
    readOnly?: boolean;
    rules?: Omit<RegisterOptions<V, N>, 'disabled'>;
  };

export default ControlledFieldProps;
