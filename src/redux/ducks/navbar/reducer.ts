import { NavbarActionTypes } from './actionTypes';
import { NavbarActions, NavbarState } from './types';

const initialState: NavbarState = {
    selectedButtonIndex: -1,
    navbarItems: [
        { text: 'users', route: '/users' },
        { text: 'chat', route: '/chat' },
        { text: 'dialogs', route: `/dialogs` },
        { text: 'profile', route: `/profile` }
    ]
};

export const navbarReducer = (state = initialState, action: NavbarActions): NavbarState => {
    switch (action.type) {
        case NavbarActionTypes.SET_USER_PHOTO: {
            return {
                ...state,
                navbarItems: state.navbarItems.map((n) =>
                    n.text.includes('profile') ? { ...n, icon: action.payload.profilePhoto } : n
                )
            };
        }
        case NavbarActionTypes.SET_SELECTED_BUTTON_INDEX: {
            return {
                ...state,
                selectedButtonIndex: action.payload.selectedButtonIndex
            };
        }
        case NavbarActionTypes.SET_NAVBAR_ITEMS: {
            return {
                ...state,
                navbarItems: action.payload.navbarItems
            };
        }
        case NavbarActionTypes.RESET_NAVBAR_ITEMS: {
            return {
                ...state,
                navbarItems: initialState.navbarItems.map((n) =>
                    n.route.includes('/profile')
                        ? { ...n, route: `/profile/${action.payload.id}` }
                        : n
                )
            };
        }
        case NavbarActionTypes.SET_NEW_MESSAGES_COUNT: {
            return {
                ...state,
                navbarItems: state.navbarItems.map((n) =>
                    n.route.includes('/dialogs')
                        ? { ...n, badge: action.payload.NewMessagesCount }
                        : n
                )
            };
        }
        default: {
            return state;
        }
    }
};
