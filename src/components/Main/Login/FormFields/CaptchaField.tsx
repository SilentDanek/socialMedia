import { TextField } from "@mui/material";
import { Control, Controller, useFormState } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const CaptchaField:FC<EmailField> = ({control}) => {
    const {errors} = useFormState({control});
    return <Controller
        name="captcha"
        control={control}
        defaultValue=""
        rules={{ required: "Captcha is required" }}
        render={({ field }) => (
            <TextField
                {...field}
                type="text"
                label="Captcha"
                placeholder="Captcha"
                error={!!errors.captcha}
                helperText={errors.captcha?.message}
                fullWidth
                margin="normal"
            />
        )}
    />
}