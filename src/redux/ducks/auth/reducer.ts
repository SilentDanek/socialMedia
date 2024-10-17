import { AuthActionTypes } from './actionTypes';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
    login: null,
    id: null,
    isAuth: false,
    captchaUrl: null
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH_USER_DATA: {
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                isAuth: action.payload.isAuth
            };
        }
        case AuthActionTypes.SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            };
        }
        default: {
            return state;
        }
    }
};
