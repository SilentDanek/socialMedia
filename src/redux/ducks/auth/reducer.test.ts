import { authReducer } from './reducer';
import { AuthAction, AuthState } from './types';
import { authActions } from './actions.ts';

describe('authReducer', () => {
    const initialState: AuthState = {
        login: null,
        id: null,
        isAuth: false,
        captchaUrl: null
    };
    test('should return initial state when state is undefined', () => {
        const action = { type: 'UNKNOWN_ACTION' } as unknown as AuthAction;
        const state = authReducer(undefined, action);
        expect(state).toEqual(initialState);
    });
    test('should handle SET_AUTH_USER_DATA', () => {
        const action = authActions.setAuthUserData(1, 'testUser', true);

        const expectedState: AuthState = {
            login: 'testUser',
            id: 1,
            isAuth: true,
            captchaUrl: null
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
    test('should handle SET_CAPTCHA_URL', () => {
        const action = authActions.setCaptchaUrl('https://test.captcha.url');

        const expectedState: AuthState = {
            login: null,
            id: null,
            isAuth: false,
            captchaUrl: 'https://test.captcha.url'
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
    test('should return current state for unknown action type', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        const currentState: AuthState = {
            login: 'testUser',
            id: 1,
            isAuth: true,
            captchaUrl: null
        };

        const state = authReducer(currentState, unknownAction as any);
        expect(state).toBe(currentState);
    });
});
