import { styled } from '@mui/material/styles';

export const MainContent = styled('main')(({ theme }) => ({
    backgroundImage: `url(${theme.palette.backgroundImg}), ${theme.palette.backgroundGradient}`,
    flex: 1,
    overflow: 'hidden',
    height: '100%'
}));
