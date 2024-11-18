import { styled } from '@mui/material/styles';
import { ThemeBox } from '../../common';
import { Box, Button, ButtonProps, Stack } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import React, { FC, PropsWithChildren } from 'react';

type SignInForm = React.FormHTMLAttributes<HTMLFormElement>;

export const SignInForm: FC<SignInForm> = ({ children, ...props }) => {
    return (
        <ThemeBox
            sx={{
                minWidth: 300,
                maxWidth: '22%',
                padding: '1% 1.5%',
                borderRadius: '20px',
                margin: 6
            }}
        >
            <form {...props}>{children}</form>
        </ThemeBox>
    );
};

type ResetFormButtonProps = PropsWithChildren & ButtonProps;

export const ResetFormButton: FC<ResetFormButtonProps> = ({ children, ...props }) => {
    return (
        <Button variant="contained" color="secondary" sx={{ width: '40%' }} {...props}>
            {children}
        </Button>
    );
};

type SignInButtonProps = PropsWithChildren & LoadingButtonProps;

export const SignInButton: FC<SignInButtonProps> = ({ children, ...props }) => {
    return (
        <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '50%' }}
            {...props}
        >
            {children}
        </LoadingButton>
    );
};

export const FormButtonsContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}));

export const LoginPageWrapper = styled(Stack)(() => ({
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}));
