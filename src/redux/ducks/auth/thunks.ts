import {authActions} from "./actions";
import {AuthAction} from "./types";
import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../../../api/api";
import {ThunkAction} from "redux-thunk";
import {State} from "../../types";
import { FormError } from "../../../api/Errors";


type AuthThunk = ThunkAction<Promise<void>, State, unknown, AuthAction>;

const getAuthUserData = ():AuthThunk => async (dispatch) => {
    try {
        const response = await authAPI.getAuthUserData();
        if (response.resultCode === ResultCodes.Success) {
            const {id, login} = response.data;
            dispatch(authActions.setAuthUserData(id, login, true));
        }
    } catch (error){
        console.log(error);
    }
};

const login = (login: string, password: string, rememberMe: boolean, captcha = ""):AuthThunk => async (dispatch) => {
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

    throw new FormError(errorMessage);
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