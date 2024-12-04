import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '@theme/themes.ts';

export const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};
