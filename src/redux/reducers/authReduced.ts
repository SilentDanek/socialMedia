import {IAction} from "../../interfaces/IAction";
import {IAuth} from "../../interfaces/IAuth";
import {AuthActionTypes} from "../actions/actionTypes/authActionTypes";
import {authAPI} from "../../api/api";
import {Dispatch} from "react";


let initialState: IAuth = {
    login: null,
    id: null,
    password: null,
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

export const setAuthUserData = (id:number|null, login:string|null, password:string|null, isAuth:boolean): IAction => ({
    type: AuthActionTypes.SET_AUTH_USER_DATA,
    payload: {
        id,
        login,
        password,
        isAuth
    }
})

export const getAuthUserData = () => (dispatch: Dispatch<any>) => {
    authAPI.getAuthUserData()
        .then((response) => {
            if (response.resultCode === 0) {
                const {id, login, password} = response.data;
                dispatch(setAuthUserData(id, login, password, true));
            }
        })
}

export const login = (login:string, password:string, rememberMe:boolean) => (dispatch: Dispatch<any>) => {
    authAPI.login(login, password, rememberMe)
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        })
}

export const logout = () => (dispatch: Dispatch<any>) => {
    authAPI.logout()
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
}