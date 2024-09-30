import { Checkbox, FormControlLabel } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const RememberMeCheckBox:FC<EmailField> = ({control}) => {
    return <Controller
        name="rememberMe"
        control={control}
        defaultValue={false}
        render={({ field }) => (
            <FormControlLabel
                control={<Checkbox {...field} />}
                label="Remember me"
            />
        )}
    />
}