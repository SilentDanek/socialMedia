import { Box, Card, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { FC, PropsWithChildren } from 'react';

type DialogItemWrapperProps = {
    isSelected: boolean;
} & PropsWithChildren;

export const DialogItemCard: FC<DialogItemWrapperProps> = ({ isSelected, children }) => {
    const theme = useTheme();
    return (
        <Card
            component="article"
            sx={{
                cursor: 'pointer',
                borderRadius: '12px',
                backgroundColor: isSelected
                    ? theme.palette.backgroundColors?.main
                    : theme.palette.background.default,
                '&:hover': {
                    backgroundColor: isSelected ? 'auto' : theme.palette.backgroundColors.hover
                }
            }}
        >
            {children}
        </Card>
    );
};

export const DialogItemContent = styled(CardContent)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}));

export const DialogItemUserData = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    paddingLeft: '16px',
    [theme.breakpoints.down('md')]: { display: 'none' }
}));
