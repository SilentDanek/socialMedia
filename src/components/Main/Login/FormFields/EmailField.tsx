import { Control } from "react-hook-form";
import { FC } from "react";
import { LoginFieldValues } from "../Login";
import { useTranslation } from "react-i18next";
import { ControlledTextField } from "../../../common/ControlledElements/ControlledTextField";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const EmailField:FC<EmailField> = ({control}) => {
    const { t } = useTranslation("login");

    return <ControlledTextField control={control}
                                rules={{
                                    pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email is invalid" },
                                    required: t('emailRequire')
                                }}
                                label={"Email"}
                                placeholder={"Email"}
                                name={"email"}
                                type={"email"}
                                margin={"normal"}
    />;

}