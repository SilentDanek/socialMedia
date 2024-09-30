import { TextField } from "@mui/material";
import { Control, Controller, useFormState } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const EmailField:FC<EmailField> = ({control}) => {
    const {errors} = useFormState({control});
    return <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email is invalid" },
            required: "Email is required"
        }}
        render={({ field }) => (
            <TextField
                {...field}
                type="email"
                label="Login"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
            />
        )}
    />
}