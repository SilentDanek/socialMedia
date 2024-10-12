import {State} from "../../types";


export const getAuthStatus = (state:State) => {
    return state.auth.isAuth;
};

export const getAuthUserId = (state:State) => {
    return state.auth.id;
};

export const getCaptchaUrl = (state:State) => {
    return state.auth.captchaUrl;
};
