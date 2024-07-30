import {IAction} from "../../../interfaces/IAction";
import {AuthActionTypes} from "../actionTypes/authActionTypes";
import {IAuth} from "../../../interfaces/IAuth";

export const setAuthUserData = ({id, email, login}:IAuth):IAction=>({
    type:AuthActionTypes.SET_AUTH_USER_DATA,
    payload:{
        id,
        email,
        login
    }
})