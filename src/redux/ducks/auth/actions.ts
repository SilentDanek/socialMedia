import {AuthActionTypes} from "./actionTypes";
import {SetAuthUserDataAction, SetCaptchaUrlAction} from "./types";


export const setAuthUserData = (id: number | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: AuthActionTypes.SET_AUTH_USER_DATA,
    payload: {
        id,
        login,
        isAuth
    }
});

export const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlAction => ({
    type: AuthActionTypes.SET_CAPTCHA_URL,
    payload: {
        captchaUrl
    }
});