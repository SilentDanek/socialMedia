import {IState} from "../../interfaces/IState";

export const getAuthStatus = (state:IState) => {
    return state.auth.isAuth;
};