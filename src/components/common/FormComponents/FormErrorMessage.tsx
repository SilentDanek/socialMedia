import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type FormErrorMessageProps = {
    children?: ReactNode;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ children }) => {
    return (
        <Typography color="error" borderColor="2px solid red">
            {children}
        </Typography>
    );
};
