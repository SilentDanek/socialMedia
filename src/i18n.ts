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
import enUsers from './locales/en/users.json';
import uaUsers from './locales/ua/users.json';

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
                users: enUsers,
            },
            ua: {
                login: uaLogin,
                navbar: uaNavbar,
                chat: uaChat,
                profile: uaProfile,
                users: uaUsers
            },
        },
        lng: defaultLang || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    }).then();

export default i18n;