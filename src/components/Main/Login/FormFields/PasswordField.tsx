import { Control } from 'react-hook-form';
import { LoginFieldValues } from '../Login';
import React, { FC, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { ControlledTextField } from '@components/common';

type EmailField = {
    control: Control<LoginFieldValues, unknown>;
};

export const PasswordField: FC<EmailField> = ({ control }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation('login');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <ControlledTextField
            control={control}
            rules={{
                minLength: { value: 4, message: 'Min password length is 4' },
                required: t('passwordRequire')
            }}
            label={t('password')}
            name="password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
};
