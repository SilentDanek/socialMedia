import {AuthActionTypes} from "./actionTypes";


export const authActions = {
    setAuthUserData: (id: number | null, login: string | null, isAuth: boolean) => ({
        type: AuthActionTypes.SET_AUTH_USER_DATA,
        payload: {
            id,
            login,
            isAuth
        }
    } as const),
    setCaptchaUrl: (captchaUrl: string | null) => ({
        type: AuthActionTypes.SET_CAPTCHA_URL,
        payload: {
            captchaUrl
        }
    } as const)
}
