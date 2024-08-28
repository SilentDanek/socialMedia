import {State} from "../../store";


export const getAuthStatus = (state:State) => {
    return state.auth.isAuth;
};

export const getAuthUserId = (state:State) => {
    return state.auth.id;
};

export const getCaptchaUrl = (state:State) => {
    return state.auth.captchaUrl;
};

export const getLogin = (state:State) => {
    return state.auth.login;
};