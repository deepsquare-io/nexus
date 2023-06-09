import type { FieldValues } from 'react-hook-form/dist/types';
import type { FieldPath } from 'react-hook-form/dist/types';
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
