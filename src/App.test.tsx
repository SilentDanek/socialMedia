import { render } from '@testing-library/react';
import { App } from './App.tsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n.ts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { CustomThemeProvider } from './theme';

test('renders without crashing', () => {
    render(
        <CustomThemeProvider>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </I18nextProvider>
        </CustomThemeProvider>
    );
});
