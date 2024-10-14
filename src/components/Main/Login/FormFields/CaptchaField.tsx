import { Control } from 'react-hook-form';
import { FC } from 'react';
import { LoginFieldValues } from '../Login';
import { ControlledTextField } from '../../../common';

type EmailField = {
    control: Control<LoginFieldValues, unknown>;
};

export const CaptchaField: FC<EmailField> = ({ control }) => {
    return (
        <ControlledTextField
            control={control}
            rules={{ required: 'Captcha is required' }}
            label="Captcha"
            name="captcha"
            type="text"
            margin="normal"
        />
    );
};
