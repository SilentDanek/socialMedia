import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLogin from './en/login.json';
import uaLogin from './ua/login.json';
import enNavbar from './en/navbar.json';
import uaNavbar from './ua/navbar.json';
import enChat from './en/chat.json';
import uaChat from './ua/chat.json';
import enProfile from './en/profile.json';
import uaProfile from './ua/profile.json';
import enUsers from './en/users.json';
import uaUsers from './ua/users.json';
import enNotFound from './en/not-found.json';
import uaNotFound from './ua/not-found.json';

const defaultLang = localStorage.getItem('language');
i18n.use(initReactI18next).init({
    resources: {
        en: {
            login: enLogin,
            navbar: enNavbar,
            chat: enChat,
            profile: enProfile,
            users: enUsers,
            notFound: enNotFound
        },
        ua: {
            login: uaLogin,
            navbar: uaNavbar,
            chat: uaChat,
            profile: uaProfile,
            users: uaUsers,
            notFound: uaNotFound
        }
    },
    lng: defaultLang || 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
