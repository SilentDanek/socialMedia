import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { navbarThunks } from './thunks';
import { navbarActions } from './actions';
import { profileAPI } from '../../../api/api';

// Создаем mockStore для тестов
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

// Мокаем API
jest.mock('../../../api/api');

describe('navbarThunks', () => {
    let store: any;

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

        // Мокаем ответ API
        (profileAPI.getUserProfile as jest.Mock).mockResolvedValue(mockResponse);

        const userId = 1;

        // Выполняем thunk
        await store.dispatch(navbarThunks.loadProfilePhoto(userId));

        // Проверяем, что правильный экшен был отправлен
        const actions = store.getActions();
        expect(actions[0]).toEqual(navbarActions.setProfilePhoto(mockProfilePhoto));
    });

    test('should handle errors gracefully', async () => {
        // Мокаем ошибку API
        const mockError = new Error('Failed to fetch');
        (profileAPI.getUserProfile as jest.Mock).mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const userId = 1;

        // Выполняем thunk
        await store.dispatch(navbarThunks.loadProfilePhoto(userId));

        // Проверяем, что ошибка была залогирована
        expect(consoleSpy).toHaveBeenCalledWith(mockError);

        consoleSpy.mockRestore();
    });
});
