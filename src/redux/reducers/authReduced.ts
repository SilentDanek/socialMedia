import {IAction} from "../../interfaces/IAction";
import {authAPI, securityAPI} from "../../api/api";
import {Dispatch} from "react";
import {stopSubmit} from "redux-form";

enum AuthActionTypes {
    SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA",
    SET_CAPTCHA_URL = "SET_CAPTCHA_URL",
}

export interface IAuth {
    id: number | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
}

let initialState: IAuth = {
    login: null,
    id: null,
    isAuth: false,
    captchaUrl: null,
};

export function authReducer(state = initialState, action: IAction): IAuth {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }
        case AuthActionTypes.SET_CAPTCHA_URL: {
            return {
                ...state,
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const setAuthUserData = (id: number | null, login: string | null, isAuth: boolean): IAction => ({
    type: AuthActionTypes.SET_AUTH_USER_DATA,
    payload: {
        id,
        login,
        isAuth
    }
})

export const setCaptchaUrl = (captchaUrl: string | null): IAction => ({
    type: AuthActionTypes.SET_CAPTCHA_URL,
    payload: {
        captchaUrl
    }
})

export const getAuthUserData = () => async (dispatch: Dispatch<IAction>) => {
    const response = await authAPI.getAuthUserData();
    if (response.resultCode === 0) {
        const {id, login} = response.data;
        dispatch(setAuthUserData(id, login, true));
    }
}

export const login = (login: string, password: string, rememberMe: boolean, captcha = "") => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.login(login, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
        return;
    }
    if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
    }
    const errorMessage = response.messages.length
        ? response.messages[0]
        : "Some error";
    const action = stopSubmit("login", {_error: errorMessage})
    dispatch(action);

}

export const logout = () => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.logout()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<any>) => {

    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;

    dispatch(setCaptchaUrl(captchaUrl));
}
