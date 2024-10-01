import { TextField } from "@mui/material";
import { Control, Controller, useFormState } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";
import { useTranslation } from "react-i18next";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const EmailField:FC<EmailField> = ({control}) => {
    const {errors} = useFormState({control});
    const { t } = useTranslation("login");
    return <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email is invalid" },
            required: t('emailRequire')
        }}
        render={({ field }) => (
            <TextField
                {...field}
                type="email"
                label="Email"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
            />
        )}
    />
}