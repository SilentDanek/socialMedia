import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormControlLabel, Checkbox, CheckboxProps } from '@mui/material';

type ControlledCheckboxProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
} & CheckboxProps;

export const ControlledCheckbox = <T extends FieldValues>({
                                                       name,
                                                       control,
                                                       label,
                                                       ...props
                                                   }: ControlledCheckboxProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel
                control={<Checkbox {...field} checked={!!field.value} {...props} />}
                label={label}
            />
        )}
    />
);