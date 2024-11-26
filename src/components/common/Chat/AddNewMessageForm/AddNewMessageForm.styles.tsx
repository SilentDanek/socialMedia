import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const MessageFormWrapper = styled(Paper)(() => ({
    borderRadius: '25px'
}));

export const MessageForm = styled(Paper)(() => ({
    ariaLabel: 'Message form',
    width: '100%',
    display: 'flex',
    borderRadius: '25px'
}));
