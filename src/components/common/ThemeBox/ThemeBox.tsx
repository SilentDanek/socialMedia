import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

export const ThemeBox = styled(Box)<BoxProps>(({ theme }) => ({
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
