import { authThunks } from './thunks';
import { authAPI, ResultCodes, securityAPI } from '../../../api';
import { authActions } from './actions';
import { FormError } from '../../../api/APIErrors.ts';
import { State } from '../../types.ts';
import { configureMockStoreTyped } from '../../../test';

jest.mock('../../../api');

const mockedAuthAPI = authAPI as jest.Mocked<typeof authAPI>;
const mockedSecurityAPI = securityAPI as jest.Mocked<typeof securityAPI>;

const mockStore = configureMockStoreTyped<State>();

describe('authThunks', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    test('getAuthUserData dispatches setAuthUserData on success', async () => {
        const mockResponse = {
            resultCode: ResultCodes.Success,
            data: { id: 1, login: 'testUser', email: 'testEmail' },
            messages: []
        };

        mockedAuthAPI.getAuthUserData.mockResolvedValue(mockResponse);

        await store.dispatch(authThunks.getAuthUserData());

        const actions = store.getActions();
        expect(actions[0]).toEqual(authActions.setAuthUserData(1, 'testUser', true));
        expect(authAPI.getAuthUserData).toHaveBeenCalled();
    });

    test('login dispatches getAuthUserData on success', async () => {
        const mockResponse = {
            resultCode: ResultCodes.Success,
            messages: [],
            data: { userId: 1 }
        };

        mockedAuthAPI.login.mockResolvedValue(mockResponse);

        await store.dispatch(authThunks.login('test@example.com', 'password', true, ''));

        const actions = store.getActions();
        expect(authAPI.login).toHaveBeenCalledWith('test@example.com', 'password', true, '');
        expect(actions).toContainEqual(authActions.setAuthUserData(1, 'testUser', true));
    });

    test('login throws FormError on failure', async () => {
        const mockResponse = {
            resultCode: ResultCodes.Error,
            messages: ['Invalid login'],
            data: { userId: 1 }
        };

        mockedAuthAPI.login.mockResolvedValue(mockResponse);

        await expect(
            store.dispatch(authThunks.login('wrong@example.com', 'password', true, ''))
        ).rejects.toThrow(FormError);

        expect(authAPI.login).toHaveBeenCalledWith('wrong@example.com', 'password', true, '');
    });

    test('logout dispatches setAuthUserData(null, null, false) on success', async () => {
        const mockResponse = {
            resultCode: ResultCodes.Success,
            data: { userId: 2 },
            messages: []
        };

        mockedAuthAPI.logout.mockResolvedValue(mockResponse);

        await store.dispatch(authThunks.logout());

        const actions = store.getActions();
        expect(actions[0]).toEqual(authActions.setAuthUserData(null, null, false));
    });

    test('getCaptchaUrl dispatches setCaptchaUrl', async () => {
        const mockCaptchaResponse = { url: 'captcha-url' };

        mockedSecurityAPI.getCaptchaUrl.mockResolvedValue(mockCaptchaResponse);

        await store.dispatch(authThunks.getCaptchaUrl());

        const actions = store.getActions();
        expect(actions[0]).toEqual(authActions.setCaptchaUrl('captcha-url'));
    });
});
