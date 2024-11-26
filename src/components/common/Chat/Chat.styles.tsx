import { styled } from '@mui/system';
import { Stack } from '@mui/material';

export const ChatWrapper = styled(Stack)(() => ({
    ariaLabel: 'Chat',
    flexDirection: 'column',
    height: '100%',
    maxWidth: 1000,
    width: '100%',
    margin: 'auto'
}));
