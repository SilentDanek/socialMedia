import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

export const ThemeBox = styled(Box)<BoxProps & { component?: React.ElementType }>(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    border: '2px solid gray',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
}));

export const BorderLessThemeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3]
}));
