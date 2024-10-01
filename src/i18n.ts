import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLogin from './locales/en/login.json';
import uaLogin from './locales/ua/login.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
            },
            ua: {
                login: uaLogin,
            },
        },
        lng: 'ua',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;