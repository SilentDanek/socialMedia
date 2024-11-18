import { styled } from '@mui/system';
import { ThemeBox } from '@components/common';
import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const DialogItemsWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeBox
            component="section"
            sx={{
                height: '100%',
                overflowY: 'auto',
                minWidth: {
                    md: '380px',
                    xs: '100px'
                }
            }}
        >
            {children}
        </ThemeBox>
    );
};

export const DialogWrapper = styled(Stack)(() => ({
    flexDirection: 'row',
    height: '100%'
}));
