import { useEffect, useState } from 'react';
import { Chat, Group, Person } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import { Namespace, TFunction } from 'i18next';

export function useProtectedRoutes<T extends Namespace<string>>(
    isAuth: boolean,
    id: number | null,
    t: TFunction<T, undefined>
) {
    const initialListItems = [
        { text: t('users'), icon: <Group />, route: '/users' },
        { text: t('chat'), icon: <PublicIcon />, route: '/chat' },
        { text: t('dialogs'), icon: <Chat />, route: `/dialogs` },
        { text: t('profile'), icon: <Person />, route: `/profile/${id}` }
    ];

    const [listItems, setListItems] = useState(initialListItems);

    useEffect(() => {
        if (!isAuth) {
            const updatedListItems = initialListItems.map((item) =>
                item.route.includes('/users') ? item : { ...item, route: '/login' }
            );
            setListItems(updatedListItems);
        } else {
            setListItems(initialListItems);
        }
    }, [isAuth, t('users')]);

    return listItems;
}
