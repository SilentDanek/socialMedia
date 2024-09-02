import {authActions} from "./actions";
import {AuthAction} from "./types";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../../../api/api";
import {ThunkAction} from "redux-thunk";
import {State} from "../../types";
import {Action} from "redux";


// Определяем универсальный тип Thunk, который принимает типы экшенов как параметр
type Thunk<ReturnType = void, ActionType extends Action = Action> = ThunkAction<Promise<ReturnType>, State, unknown, ActionType>;

// Определяем типы Thunk для Auth
export type AuthThunk = Thunk<void, AuthAction>;


const getAuthUserData = ():AuthThunk => async (dispatch) => {
    const response = await authAPI.getAuthUserData();
    if (response.resultCode === ResultCodes.Success) {
        const {id, login} = response.data;
        dispatch(authActions.setAuthUserData(id, login, true));
    }
};
// Определяем Thunk, который может принимать как AuthAction, так и FormAction
type Auth_FormThunk = Thunk<void, AuthAction | FormAction>;
const login = (login: string, password: string, rememberMe: boolean, captcha = ""):Auth_FormThunk => async (dispatch) => {
    const response = await authAPI.login(login, password, rememberMe, captcha);
    if (response.resultCode === ResultCodes.Success) {
        await dispatch(getAuthUserData());
        return;
    }

    if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        await dispatch(getCaptchaUrl());
    }
    const errorMessage = response.messages.length
        ? response.messages[0]
        : "Some error";
    const action = stopSubmit("login", {_error: errorMessage});
    dispatch(action);
};

const logout = ():AuthThunk => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodes.Success) {
        dispatch(authActions.setAuthUserData(null, null, false));
    }
};

const getCaptchaUrl = ():AuthThunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;

    dispatch(authActions.setCaptchaUrl(captchaUrl));
};

export const authThunks = {
    getAuthUserData,
    login,
    logout,
    getCaptchaUrl
}