import { styled } from '@mui/system';
import { Paper, PaperProps } from '@mui/material';
import { FC, FormEventHandler, PropsWithChildren } from 'react';

export const MessageFormWrapper = styled(Paper)(() => ({
    borderRadius: '25px'
}));

type MessageFormProps = PropsWithChildren &
    Omit<PaperProps<'form'>, 'component'> & {
        onSubmit?: FormEventHandler<HTMLFormElement>;
    };

export const MessageForm: FC<MessageFormProps> = ({ children, ...props }) => {
    return (
        <Paper
            component="form"
            sx={{ ariaLabel: 'Message form', width: '100%', display: 'flex', borderRadius: '25px' }}
            {...props}
        >
            {children}
        </Paper>
    );
};
