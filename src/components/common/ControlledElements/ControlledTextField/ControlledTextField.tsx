import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type ControlledTextFieldProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T, unknown>;
    label?: string;
    placeholder?: string;
    multiline?: boolean;
    rules?: RegisterOptions<T, Path<T>>;
} & TextFieldProps;

export const ControlledTextField = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    rules,
    multiline = false,
    ...props
}: ControlledTextFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                value={field.value || ''}
                label={label}
                aria-label={label}
                aria-placeholder={placeholder}
                placeholder={placeholder ? placeholder : label}
                margin="dense"
                multiline={multiline}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                {...props}
            />
        )}
    />
);
