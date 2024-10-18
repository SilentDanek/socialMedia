import { navbarReducer } from './reducer';
import { NavbarState } from './types';
import { navbarActions } from './actions';

const initialState: NavbarState = {
    selectedButtonIndex: -1,
    navbarItems: [
        { text: 'users', route: '/users' },
        { text: 'chat', route: '/chat' },
        { text: 'dialogs', route: '/dialogs' },
        { text: 'profile', route: '/profile' }
    ]
};

describe('navbarReducer tests', () => {
    test('should handle SET_USER_PHOTO', () => {
        const newState = navbarReducer(initialState, navbarActions.setProfilePhoto('newPhoto.png'));

        expect(newState.navbarItems.find((item) => item.text === 'profile')?.icon).toBe(
            'newPhoto.png'
        );
    });

    test('should handle SET_SELECTED_BUTTON_INDEX', () => {
        const newState = navbarReducer(initialState, navbarActions.setSelectedButtonIndex(2));

        expect(newState.selectedButtonIndex).toBe(2);
    });

    test('should handle SET_NAVBAR_ITEMS', () => {
        const newItems = [
            { text: 'home', route: '/home' },
            { text: 'settings', route: '/settings' }
        ];
        const newState = navbarReducer(initialState, navbarActions.setNavbarItems(newItems));

        expect(newState.navbarItems).toEqual(newItems);
    });

    test('should handle RESET_NAVBAR_ITEMS', () => {
        const newState = navbarReducer(initialState, navbarActions.resetNavbarItems(5));

        expect(newState.navbarItems.find((item) => item.text === 'profile')?.route).toBe(
            '/profile/5'
        );
    });

    test('should handle SET_NEW_MESSAGES_COUNT', () => {
        const newState = navbarReducer(initialState, navbarActions.setNewMessagesCount(10));

        expect(newState.navbarItems.find((item) => item.route === '/dialogs')?.badge).toBe(10);
    });

    test('should return the initial state when action is unknown', () => {
        const newState = navbarReducer(initialState, { type: 'UNKNOWN_ACTION' } as any);

        expect(newState).toEqual(initialState);
    });
});
