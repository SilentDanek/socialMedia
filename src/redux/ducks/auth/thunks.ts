import {setAuthUserData, setCaptchaUrl} from "./actions";
import {AuthAction} from "./types";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../../../api/api";
import {ThunkAction} from "redux-thunk";
import {State} from "../../store";
import {Action} from "redux";


// Определяем универсальный тип Thunk, который принимает типы экшенов как параметр
type Thunk<ReturnType = void, ActionType extends Action = Action> = ThunkAction<Promise<ReturnType>, State, unknown, ActionType>;

// Определяем типы Thunk для Auth
export type AuthThunk = Thunk<void, AuthAction>;

// Определяем Thunk, который может принимать как AuthAction, так и FormAction
type Auth_FormThunk = Thunk<void, AuthAction | FormAction>;

export const getAuthUserData = ():AuthThunk => async (dispatch) => {
    const response = await authAPI.getAuthUserData();
    if (response.resultCode === ResultCodes.Success) {
        const {id, login} = response.data;
        dispatch(setAuthUserData(id, login, true));
    }
};

export const login = (login: string, password: string, rememberMe: boolean, captcha = ""):Auth_FormThunk => async (dispatch) => {
    const response = await authAPI.login(login, password, rememberMe, captcha);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData());
        return;
    }

    if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
    }
    const errorMessage = response.messages.length
        ? response.messages[0]
        : "Some error";
    const action = stopSubmit("login", {_error: errorMessage});
    dispatch(action);
};

export const logout = ():AuthThunk => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserData(null, null, false));
    }
};

export const getCaptchaUrl = ():AuthThunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;

    dispatch(setCaptchaUrl(captchaUrl));
};
