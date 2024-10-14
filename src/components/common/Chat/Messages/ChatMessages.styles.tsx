import { styled } from '@mui/material/styles';
import { BorderLessThemeBox } from '../../index.ts';
import { FC, ReactNode } from 'react';
import { Stack, StackProps, useTheme } from '@mui/material';

export const MessagesWrapper = styled('section')(() => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    gap: '6px',
    overflowY: 'scroll',
    '& > :first-of-type:not(div)': {
        marginTop: 'auto'
    }
}));

export const MessageContent: FC<MessageProps> = ({ isMessageOwner, children, sx }) => {
    const theme = useTheme();
    return (
        <BorderLessThemeBox
            sx={{
                margin: `0 ${isMessageOwner ? '12px' : 0} 0 ${isMessageOwner ? 0 : '12px'}`,
                position: 'relative',
                p: 1,
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
                },
                ...sx
            }}
        >
            {children}
        </BorderLessThemeBox>
    );
};

export const MessageWrapper: FC<MessageProps> = ({ isMessageOwner, children, sx }) => {
    const flexDirection = isMessageOwner ? 'row-reverse' : 'row';
    return (
        <Stack
            direction={flexDirection}
            alignItems="flex-start"
            component="article"
            gap="8px"
            sx={sx}
        >
            {children}
        </Stack>
    );
};

type MessageProps = {
    isMessageOwner: boolean;
    children: ReactNode;
} & StackProps;
