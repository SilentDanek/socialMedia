import { authReducer } from './reducer';
import { AuthActionTypes } from './actionTypes';
import { AuthState, AuthAction } from './types';

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
        const action: AuthAction = {
            type: AuthActionTypes.SET_AUTH_USER_DATA,
            payload: {
                login: 'testUser',
                id: 1,
                isAuth: true
            }
        };

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
        const action: AuthAction = {
            type: AuthActionTypes.SET_CAPTCHA_URL,
            payload: {
                captchaUrl: 'https://test.captcha.url'
            }
        };

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
        const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as AuthAction;
        const currentState: AuthState = {
            login: 'testUser',
            id: 1,
            isAuth: true,
            captchaUrl: null
        };

        const state = authReducer(currentState, unknownAction);
        expect(state).toBe(currentState);
    });
});
