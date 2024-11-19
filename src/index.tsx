import ReactDOM from 'react-dom/client';
import { App } from './App';
import i18n from './locales/i18n.ts';
import { store } from './redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { CustomThemeProvider } from './theme';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <CustomThemeProvider>
        <I18nextProvider i18n={i18n}>
            <HelmetProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </HelmetProvider>
        </I18nextProvider>
    </CustomThemeProvider>
);
