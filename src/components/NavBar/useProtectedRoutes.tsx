import { useEffect, useState } from 'react';
import { Chat, Group, Person } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import { useGetNewMessagesCountQuery } from '../../api/dialogsAPI.ts';
import { useLocation } from 'react-router-dom';
import { getAuthStatus, getAuthUserId, useAppSelector } from '../../redux';
import { useTranslation } from 'react-i18next';

export function useProtectedRoutes() {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const { t } = useTranslation('navbar');

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const { data: newMessagesCount } = useGetNewMessagesCountQuery({}, { pollingInterval: 15000 });

    const initialListItems = [
        { text: t('users'), icon: <Group />, route: '/users' },
        { text: t('chat'), icon: <PublicIcon />, route: '/chat' },
        { text: t('dialogs'), icon: <Chat />, route: `/dialogs`, badge: newMessagesCount },
        { text: t('profile'), icon: <Person />, route: `/profile/${id}` }
    ];

    const [navbarItems, setListItems] = useState(initialListItems);

    useEffect(() => {
        if (!isAuth) {
            const updatedListItems = initialListItems.map((item) =>
                item.route.includes('/users') ? item : { ...item, route: '/login' }
            );
            setListItems(updatedListItems);
        } else {
            setListItems(initialListItems);
        }
    }, [isAuth, newMessagesCount]);

    const location = useLocation();
    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            const selectedPage = initialListItems.findIndex((b) => b.route.includes(pathParts[0]));
            setSelectedIndex(selectedPage);
        }
    }, [location]);

    return { selectedIndex, setSelectedIndex, navbarItems };
}
