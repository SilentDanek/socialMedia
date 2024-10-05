import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { TextField, TextFieldProps } from '@mui/material';


type ControlledTextFieldProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
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
                label={label}
                placeholder={placeholder}
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