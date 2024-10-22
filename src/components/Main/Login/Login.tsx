import { FC, useEffect, useState } from 'react';
import {
    boundThunks,
    getAuthStatus,
    getAuthUserId,
    getCaptchaUrl,
    useAppSelector
} from '../../../redux';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormState } from 'react-hook-form';
import { FormError } from '../../../api/APIErrors.ts';
import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { EmailField, PasswordField, RememberMeCheckBox, CaptchaField } from './FormFields';
import { FormContainer } from './Login.styles';
import { useTranslation } from 'react-i18next';
import { FormErrorMessage } from '../../common';

const Login: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);
    const { t } = useTranslation('login');

    const { login } = boundThunks.authThunks;
    const { setError, control, handleSubmit, setValue, reset } = useForm<LoginFieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const { isSubmitting } = useFormState<LoginFieldValues>({ control });
    const [formErrorMessage, setFormErrorMessage] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth]);

    const handleLoginSubmit = async (formData: LoginFieldValues) => {
        try {
            setFormErrorMessage('');
            await login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        } catch (error) {
            if (error instanceof FormError) {
                if (error.message.includes('anti-bot')) {
                    setError('captcha', { message: error.message });
                } else {
                    setFormErrorMessage(error.message);
                }
                setValue('captcha', '');
            } else {
                throw error;
            }
        }
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" height="100%">
            <FormContainer>
                <form
                    onSubmit={handleSubmit(handleLoginSubmit)}
                    style={{ margin: '6px' }}
                    noValidate
                >
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => reset()}
                            sx={{ width: '40%' }}
                        >
                            {t('reset')}
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isSubmitting}
                            sx={{ width: '50%' }}
                        >
                            {t('sign-in')}
                        </LoadingButton>
                    </Box>
                </form>
            </FormContainer>
        </Stack>
    );
};

export type LoginFieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError: string;
};

export default Login;
