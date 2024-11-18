import { Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import { BorderLessThemeBox } from '@components/common';

export const MessageOwnerWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography
            component="h6"
            sx={{ variant: 'subtitle1', fontWeight: 'bold', fontSize: '0.8rem', color: '#cb25cb' }}
        >
            {children}
        </Typography>
    );
};

type MessageContentProps = { isMessageOwner: boolean } & PropsWithChildren;

export const MessageContent = styled(BorderLessThemeBox, {
    shouldForwardProp: (prop) => prop !== 'isMessageOwner'
})<MessageContentProps>(({ theme, isMessageOwner = false }) => ({
    ariaLabel: 'Message',
    margin: `0 ${isMessageOwner ? '12px' : 0} 0 ${isMessageOwner ? 0 : '12px'}`,
    position: 'relative',
    padding: 8,
    borderRadius: '12px',
    maxWidth: '70%',
    wordBreak: 'break-word',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: isMessageOwner ? 'auto' : '-12px',
        right: isMessageOwner ? '-12px' : 'auto',
        width: 0,
        height: 0,
        border: '12px solid transparent',
        borderTopColor: theme.palette.background.default,
        borderBottom: 'none',
        marginBottom: '-12px'
    }
}));

export const MessageWrapper: FC<MessageContentProps> = ({ children, isMessageOwner = false }) => {
    return (
        <Stack
            component="li"
            sx={{
                flexDirection: isMessageOwner ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: '8px'
            }}
        >
            {children}
        </Stack>
    );
};
