import {IAction} from "../../interfaces/IAction";
import {authAPI} from "../../api/api";
import {Dispatch} from "react";
import {stopSubmit} from "redux-form";

enum AuthActionTypes {
    SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"
}

export interface IAuth {
    id: number | null;
    login: string | null;
    isAuth: boolean;
}

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

export const setAuthUserData = (id: number | null, login: string | null, isAuth: boolean): IAction => ({
    type: AuthActionTypes.SET_AUTH_USER_DATA,
    payload: {
        id,
        login,
        isAuth
    }
})

export const getAuthUserData = () => async (dispatch: Dispatch<IAction>) => {
    const response = await authAPI.getAuthUserData();
    if (response.resultCode === 0) {
        const {id, login} = response.data;
        dispatch(setAuthUserData(id, login, true));
    }
}

export const login = (login: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.login(login, password, rememberMe);
    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        const errorMessage = response.messages.length
            ? response.messages[0]
            : "Some error";
        const action = stopSubmit("login", {_error: errorMessage})
        dispatch(action);
    }
}

export const logout = () => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.logout()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, false));
    }
}

