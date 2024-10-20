import { Select, SelectProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ReactNode, useId } from 'react';

type ControlledSelectFieldProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    children: ReactNode;
} & SelectProps;

export const ControlledSelectField = <T extends FieldValues>({
    control,
    name,
    children,
    rules,
    ...props
}: ControlledSelectFieldProps<T>) => {
    const id = useId();
    return (
        <Controller
            control={control}
            name={name}
            {...rules}
            render={({ field }) => (
                <Select labelId={id} {...field} margin="dense" fullWidth {...props}>
                    {children}
                </Select>
            )}
        />
    );
};
