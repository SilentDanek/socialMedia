import {IAction} from "../../interfaces/IAction";
import {IAuth} from "../../interfaces/IAuth";
import {AuthActionTypes} from "../actions/actionTypes/authActionTypes";
import {authAPI} from "../../api/api";
import {Dispatch} from "react";
import {stopSubmit} from "redux-form";


let initialState: IAuth = {
    login: null,
    id: null,
    isAuth: false
};

export function authReducer(state = initialState, action: IAction): IAuth {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH_USER_DATA: {
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

export const setAuthUserData = (id:number|null, login:string|null, isAuth:boolean): IAction => ({
    type: AuthActionTypes.SET_AUTH_USER_DATA,
    payload: {
        id,
        login,
        isAuth
    }
})

export const getAuthUserData = () => (dispatch: Dispatch<any>) => {
    return authAPI.getAuthUserData()
        .then((response) => {
            if (response.resultCode === 0) {
                const {id, login} = response.data;
                dispatch(setAuthUserData(id, login, true));
            }
        })
}

export const login = (login:string, password:string, rememberMe:boolean) => (dispatch: Dispatch<any>) => {
    return authAPI.login(login, password, rememberMe)
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                const errorMessage = response.messages.length
                    ? response.messages[0]
                    : "Some error";
                const action = stopSubmit("login", {_error: errorMessage})
                dispatch(action);
            }
        })
}

export const logout = () => (dispatch: Dispatch<any>) => {
    return authAPI.logout()
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(null, null, false));
            }
        })
}