import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../locales/i18n.ts';

export const renderWithTranslation = (ui: React.ReactElement) => {
    return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};
