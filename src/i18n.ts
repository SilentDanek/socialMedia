import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLogin from './locales/en/login.json';
import uaLogin from './locales/ua/login.json';
import enNavbar from './locales/en/navbar.json';
import uaNavbar from './locales/ua/navbar.json';
import enChat from './locales/en/chat.json';
import uaChat from './locales/ua/chat.json';
import enProfile from './locales/en/profile.json';
import uaProfile from './locales/ua/profile.json';

const defaultLang = localStorage.getItem("language");

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
                navbar: enNavbar,
                chat: enChat,
                profile: enProfile,
            },
            ua: {
                login: uaLogin,
                navbar: uaNavbar,
                chat: uaChat,
                profile: uaProfile,
            },
        },
        lng: defaultLang || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;