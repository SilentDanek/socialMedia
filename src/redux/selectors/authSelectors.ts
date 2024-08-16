import {IState} from "../store";

export const getAuthStatus = (state:IState) => {
    return state.auth.isAuth;
};