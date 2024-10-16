import { NavbarActionTypes } from './actionTypes';
import { NavbarItem } from './types.ts';

export const navbarActions = {
    setProfilePhoto: (profilePhoto: string | null) =>
        ({
            type: NavbarActionTypes.SET_USER_PHOTO,
            payload: {
                profilePhoto
            }
        }) as const,
    setSelectedButtonIndex: (selectedButtonIndex: number) =>
        ({
            type: NavbarActionTypes.SET_SELECTED_BUTTON_INDEX,
            payload: {
                selectedButtonIndex
            }
        }) as const,
    setNavbarItems: (navbarItems: NavbarItem[]) =>
        ({
            type: NavbarActionTypes.SET_NAVBAR_ITEMS,
            payload: {
                navbarItems
            }
        }) as const,
    resetNavbarItems: (id: number) =>
        ({
            type: NavbarActionTypes.RESET_NAVBAR_ITEMS,
            payload: {
                id
            }
        }) as const,
    setNewMessagesCount: (NewMessagesCount: number) =>
        ({
            type: NavbarActionTypes.SET_NEW_MESSAGES_COUNT,
            payload: {
                NewMessagesCount
            }
        }) as const
};
