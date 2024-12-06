import { navbarThunks } from './thunks';
import { navbarActions } from './actions';
import { profileAPI } from '../../../api';
import { configureMockStoreTyped } from '../../../test';
import { State } from '../../types.ts';

jest.mock('../../../api');

const mockStore = configureMockStoreTyped<State>();

describe('navbarThunks', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            navbar: {
                selectedButtonIndex: -1,
                navbarItems: [
                    { text: 'users', route: '/users' },
                    { text: 'chat', route: '/chat' },
                    { text: 'dialogs', route: '/dialogs' },
                    { text: 'profile', route: '/profile' }
                ]
            }
        });
    });

    test('dispatches setProfilePhoto after successfully fetching user profile', async () => {
        const mockProfilePhoto = 'https://example.com/photo.jpg';
        const mockResponse = { photos: { large: mockProfilePhoto } };

        (profileAPI.getUserProfile as jest.Mock).mockResolvedValue(mockResponse);

        const userId = 1;

        await store.dispatch(navbarThunks.loadProfilePhoto(userId));

        const actions = store.getActions();
        expect(actions[0]).toEqual(navbarActions.setProfilePhoto(mockProfilePhoto));
    });

    test('should handle errors gracefully', async () => {
        const mockError = new Error('Failed to fetch');
        (profileAPI.getUserProfile as jest.Mock).mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const userId = 1;

        await store.dispatch(navbarThunks.loadProfilePhoto(userId));

        expect(consoleSpy).toHaveBeenCalledWith(mockError);

        consoleSpy.mockRestore();
    });
});
