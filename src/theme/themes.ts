import { createTheme } from '@mui/material/styles';

import mainBackgroundDark from '../assets/images/main_background_dark.png';
import mainBackgroundLight from '../assets/images/main_background_light.png';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        backgroundColors: {
            main: '#2c75ef',
            hover: '#e8e8e8',
            default: 'rgba(255,255,255,1)',
            defaultTransparent: 'rgba(255,255,255,0.95)'
        },
        backgroundImg: mainBackgroundLight,
        backgroundGradient: 'linear-gradient(aquamarine, #b507b5)',
        border: {
            main: '#ebecff'
        },
        primary: {
            main: '#1b52b0'
        },
        secondary: {
            main: '#e91e63'
        }
    },
    typography: {
        fontSize: 16
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        backgroundColors: {
            main: '#0c44b2',
            hover: '#333333',
            default: 'rgba(33, 33, 33, 1)',
            defaultTransparent: 'rgba(33, 33, 33, 0.90)'
        },
        backgroundImg: mainBackgroundDark,
        backgroundGradient: 'linear-gradient(aquamarine, #b507b5)',
        border: {
            main: '#05050c'
        },
        primary: {
            main: '#576df6'
        },
        secondary: {
            main: '#882a94'
        }
    },
    typography: {
        fontSize: 16
    }
});
