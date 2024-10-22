import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type FormErrorMessageProps = {
    children?: ReactNode;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ children }) => {
    return (
        <Typography
            color="error"
            border={children ? '2px solid red' : ''}
            borderRadius="5px"
            textAlign="center"
            m={1}
            data-testid="form-error-text"
        >
            {children}
        </Typography>
    );
};
