import type { PathValue } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import type ControlledFieldProps from '@components/forms/fields/ControlledFieldProps';
import type { SliderProps } from '@mui/material/Slider';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface NumberSliderProps<V extends FieldValues = Record<string, number>, N extends FieldPath<V> = FieldPath<V>>
  extends ControlledFieldProps<SliderProps, V, N> {
  label?: string;
  tooltip?: string;

  defaultValue: PathValue<V, N>;
}

export default function NumberSlider<
  V extends FieldValues = Record<string, number>,
  N extends FieldPath<V> = FieldPath<V>,
>({ control, name, min, max, label, tooltip, defaultValue, step }: NumberSliderProps<V, N>) {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules: { min, max }, defaultValue });
  let marks: { value: number; label: string }[] = [];
  for (let i = min ?? 0; i <= (max ?? 0); i += step ?? 1) {
    marks = [{ value: i, label: i.toString() }, ...marks];
  }

  return (
    <div className="my-4">
      <Tooltip className="my-4" title={tooltip} placement="top-start">
        <Typography variant="h5" gutterBottom>
          {' '}
          {label} {value}
        </Typography>
      </Tooltip>
      <div className="mx-4">
        <Slider
          value={value || min}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          color="primary"
          valueLabelDisplay="auto"
          marks={marks}
          getAriaValueText={(value) => value.toString()}
        />
      </div>
    </div>
  );
}
