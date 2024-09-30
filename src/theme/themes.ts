import { createTheme } from '@mui/material/styles';
import mainBackgroundDark  from '../assets/images/main_background_dark.png'
import mainBackgroundLight from '../assets/images/main_background_light.png'
import { Theme as MuiTheme } from "@mui/material/styles";

declare module '@emotion/react' {
    export interface Theme extends MuiTheme {}
}

declare module '@mui/material/styles' {
    interface PaletteOptions {
        backgroundImg?: string;
        backgroundGradient?: string;
        border?: {
            main: string;
        };
    }
    interface Palette {
        backgroundImg?: string;
    }

    interface Palette {
        backgroundGradient?: string;
    }
}

declare module '@emotion/react' {
    export interface Theme extends MuiTheme {}
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        backgroundImg: mainBackgroundLight,
        backgroundGradient: "linear-gradient(aquamarine, #b507b5)",
        border:{
            main:'#ebecff'
        },
        primary: {
            main: '#1b52b0',
        },
        secondary: {
            main: '#e91e63',
        },
    },
    typography: {
        fontSize: 16, // Змінює базовий розмір шрифту та SVG-іконок
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        backgroundImg: mainBackgroundDark,
        backgroundGradient: "linear-gradient(aquamarine, #b507b5)",
        border:{
            main:'#05050c'
        },
        primary: {
            main: '#0d27be',
        },
        secondary: {
            main: '#882a94',
        },
    },
    typography: {
        fontSize: 16, // Змінює базовий розмір шрифту та SVG-іконок
    },
});