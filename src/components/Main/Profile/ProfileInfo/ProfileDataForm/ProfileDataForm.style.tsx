import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

export const ButtonGroupWrapper = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}));

export const FormButton: FC<PropsWithChildren & LoadingButtonProps> = ({ children, ...props }) => {
    return (
        <LoadingButton variant="contained" sx={{ minWidth: '150px', maxWidth: '250px' }} {...props}>
            {children}
        </LoadingButton>
    );
};
