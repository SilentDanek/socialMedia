import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormState } from 'react-hook-form';
import { boundThunks, getAuthStatus, getAuthUserId, getCaptchaUrl, useAppSelector } from '@/redux';
import { FormError } from '@/api/APIErrors';

export type LoginFieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError: string;
};

export const useLogin = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);

    const { login } = boundThunks.authThunks;
    const navigate = useNavigate();

    const { setError, control, handleSubmit, setValue, reset } = useForm<LoginFieldValues>({
        defaultValues: {
            email: 'paintein666@gmail.com',
            password: 'pnYdp3_9if5ixRH'
        }
    });

    const { isSubmitting } = useFormState<LoginFieldValues>({ control });
    const [formErrorMessage, setFormErrorMessage] = useState('');

    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth, id, navigate]);

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

    const resetForm = () => {
        reset((formValues) => ({
            ...formValues,
            email: '',
            password: ''
        }));
    };

    return {
        control,
        handleSubmit,
        handleLoginSubmit,
        captchaUrl,
        resetForm,
        isSubmitting,
        formErrorMessage,
        setFormErrorMessage
    };
};
