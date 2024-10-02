import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLogin from './locales/en/login.json';
import uaLogin from './locales/ua/login.json';
import enNavbar from './locales/en/navbar.json';
import uaNavbar from './locales/ua/navbar.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
                navbar: enNavbar
            },
            ua: {
                login: uaLogin,
                navbar: uaNavbar
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;