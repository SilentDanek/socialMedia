import { store } from '@/redux';
import { testArr } from '@/utils';

declare global {
    interface Window {
        store: typeof store;
    }
}

declare module '@mui/material/styles' {
    interface PaletteOptions {
        backgroundImg: string;
        backgroundGradient: string;
        border: {
            main: string;
        };
        backgroundColors: {
            main: string;
            hover: string;
            default: string;
            defaultTransparent: string;
        };
    }

    interface Palette {
        backgroundImg: string;
        backgroundGradient: string;
        backgroundColors: {
            main: string;
            hover: string;
            default: string;
            defaultTransparent: string;
        };
    }
}

declare global {
    interface Window {
        testArr: typeof testArr;
    }
}
