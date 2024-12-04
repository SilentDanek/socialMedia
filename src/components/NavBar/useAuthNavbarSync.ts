import { useEffect } from 'react';
import { useGetNewMessagesCountQuery } from '@api/dialogsAPI.ts';
import { useLocation } from 'react-router-dom';
import { boundThunks, boundActions, getAuthUserId, useAppSelector } from '@/redux';
import { selectActiveButtonIndex, selectNavbarItems } from '@redux/ducks/navbar/selectors.ts';

export function useAuthNavbarSync() {
    const id = useAppSelector(getAuthUserId);
    const navbarItems = useAppSelector(selectNavbarItems);
    const selectedIndex = useAppSelector(selectActiveButtonIndex);
    useGetNewMessagesCountQuery(undefined, {
        skip: !id,
        pollingInterval: 15000
    });

    // Block redirect if user unauthorized except button "users"
    useEffect(() => {
        if (id) {
            boundActions.navbarActions.resetNavbarItems(id);
            boundThunks.navbarThunks.loadProfilePhoto(id);
        } else {
            const updatedListItems = navbarItems.map((item) =>
                item.route.includes('/users') ? item : { ...item, route: '/' }
            );
            boundActions.navbarActions.setNavbarItems(updatedListItems);
            boundActions.navbarActions.setProfilePhoto(null);
        }
    }, [id]);

    // Find selected button by analyzing url
    const location = useLocation();
    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        const selectedPage = navbarItems.findIndex((b) => b.text.includes(pathParts[0]));
        boundActions.navbarActions.setSelectedButtonIndex(selectedPage);
    }, [location]);

    return { selectedIndex, navbarItems };
}
