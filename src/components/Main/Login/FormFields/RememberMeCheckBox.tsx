import { Checkbox, FormControlLabel } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";
import { useTranslation } from "react-i18next";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const RememberMeCheckBox:FC<EmailField> = ({control}) => {
    const { t } = useTranslation("login");

    return <Controller
        name="rememberMe"
        control={control}
        defaultValue={false}
        render={({ field }) => (
            <FormControlLabel
                control={<Checkbox {...field} />}
                label={t("rememberMe")}
            />
        )}
    />
}