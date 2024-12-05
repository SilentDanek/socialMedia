import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CaptchaField, EmailField, PasswordField, RememberMeCheckBox } from './FormFields';
import {
    FormButtonsContainer,
    LoginPageWrapper,
    ResetFormButton,
    SignInButton,
    SignInForm
} from './Login.styles';
import { useTranslation } from 'react-i18next';
import { FormErrorMessage } from '../../common';
import { useLogin } from './useLogin.ts';

const Login: FC = () => {
    const {
        control,
        handleSubmit,
        handleLoginSubmit,
        captchaUrl,
        resetForm,
        isSubmitting,
        formErrorMessage
    } = useLogin();
    const { t } = useTranslation('login');

    return (
        <LoginPageWrapper>
            <SignInForm onSubmit={handleSubmit(handleLoginSubmit)} noValidate>
                <Typography variant="h5" component="h1" textAlign="center">
                    {t('sign-in')}
                </Typography>

                <EmailField control={control} />
                <PasswordField control={control} />
                <RememberMeCheckBox control={control} />

                {captchaUrl && (
                    <Box>
                        <img src={captchaUrl} alt="captcha" width="100%" />
                        <CaptchaField control={control} />
                    </Box>
                )}

                <FormErrorMessage>{formErrorMessage}</FormErrorMessage>

                <FormButtonsContainer>
                    <ResetFormButton onClick={() => resetForm()}>{t('reset')}</ResetFormButton>
                    <SignInButton loading={isSubmitting}>{t('sign-in')}</SignInButton>
                </FormButtonsContainer>
            </SignInForm>
        </LoginPageWrapper>
    );
};

export default Login;
