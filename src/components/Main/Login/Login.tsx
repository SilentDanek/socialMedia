import { FC, useEffect, useState } from "react";
import { bindedThunks, getAuthStatus, getAuthUserId, getCaptchaUrl, useAppSelector } from "../../../redux";
import { useNavigate } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { FormError } from "../../../api/Errors";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EmailField } from "./FormFields/EmailField";
import { PasswordField } from "./FormFields/PasswordField";
import { RememberMeCheckBox } from "./FormFields/RememberMeCheckBox";
import { CaptchaField } from "./FormFields/CaptchaField";
import { FormContainer } from "./styles";

import { useTranslation } from 'react-i18next';

export type LoginFieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError: string;
}
const Login: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);
    const { t } = useTranslation("login");

    const { login } = bindedThunks.authThunks;
    const { setError, control, handleSubmit, reset } = useForm<LoginFieldValues>();
    const { isSubmitting } = useFormState<LoginFieldValues>({ control });
    const [formErrorMessage, setFormErrorMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth]);

    const handleLoginSubmit = async (formData: LoginFieldValues) => {
        try {
            setFormErrorMessage("");
            await login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        } catch (error) {
            if (error instanceof FormError) {
                if (error.message.includes("anti-bot")) {
                    setError("captcha", { message: error.message });
                } else {
                    setFormErrorMessage(error.message);
                }
                reset({ captcha: "" });
            } else {
                throw error;
            }
        }
    };


    return (
        <Stack direction="column" justifyContent="center" alignItems="center" height="100%">
            <FormContainer>
                <form onSubmit={handleSubmit(handleLoginSubmit)} style={{ margin: "6px" }}>
                    <Typography variant={"h5"} component="h1" textAlign="center">
                        {t("signin")}
                    </Typography>

                    <EmailField control={control} />
                    <PasswordField control={control} />
                    <RememberMeCheckBox control={control} />

                    {captchaUrl && <Box>
                        <img src={captchaUrl} alt="captcha" width="100%" />
                        <CaptchaField control={control} />
                    </Box>
                    }

                    <Typography color="red" borderColor="2px solid red">
                        {formErrorMessage}
                    </Typography>

                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Button type="button" variant="contained"  color="secondary" onClick={() => reset()} sx={{width:"40%"}}>
                            {t("reset")}
                        </Button>
                        <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting} sx={{width:"50%"}}>
                            {t("signin")}
                        </LoadingButton>
                    </Box>
                </form>
            </FormContainer>
        </Stack>
    );
};

export default Login;