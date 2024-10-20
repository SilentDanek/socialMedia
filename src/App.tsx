import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { Main } from './components/Main/Main';
import { Stack } from '@mui/material';
import { CustomThemeProvider } from './theme';
import i18n from './locales/i18n.ts';
import { I18nextProvider } from 'react-i18next';

declare global {
    interface Window {
        store: typeof store;
    }
}

window.store = store;

export const App = () => {
    useEffect(() => {
        const eventHandler = (event: PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason);
        };
        window.addEventListener('unhandledrejection', eventHandler);

        return () => window.removeEventListener('unhandledrejection', eventHandler);
    }, [window]);

    return (
        <CustomThemeProvider>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Provider store={store}>
                        <Stack
                            height="100vh"
                            sx={{
                                flexDirection: {
                                    xs: 'column-reverse',
                                    sm: 'row'
                                }
                            }}
                        >
                            <NavBar />
                            <Main />
                        </Stack>
                    </Provider>
                </BrowserRouter>
            </I18nextProvider>
        </CustomThemeProvider>
    );
};
