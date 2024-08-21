import {IState} from "../store";

export const getAuthStatus = (state:IState) => {
    return state.auth.isAuth;
};

export const getAuthUserId = (state:IState) => {
    return state.auth.id;
};

export const getCaptchaUrl = (state:IState) => {
    return state.auth.captchaUrl;
};