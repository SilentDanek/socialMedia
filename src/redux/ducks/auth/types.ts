import {AuthActionTypes} from "./actionTypes";


export type AuthState = {
    id: number | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};

export type SetAuthUserDataAction = {
    type: AuthActionTypes.SET_AUTH_USER_DATA;
    payload: {
        id: number | null;
        login: string | null;
        isAuth: boolean;
    };
};
export type SetCaptchaUrlAction = {
    type: AuthActionTypes.SET_CAPTCHA_URL;
    payload: {
        captchaUrl: string | null;
    };
};
export type AuthAction = SetAuthUserDataAction | SetCaptchaUrlAction;