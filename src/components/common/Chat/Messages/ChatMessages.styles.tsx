import { styled } from '@mui/material/styles';

export const MessagesWrapper = styled('ul')(() => ({
    ariaLabel: 'Chat messages',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    overflowY: 'scroll',
    '& > :first-of-type:not(div)': {
        marginTop: 'auto'
    },
    gap: '6px'
}));
