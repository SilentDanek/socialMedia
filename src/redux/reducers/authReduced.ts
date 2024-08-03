import {IAction} from "../../interfaces/IAction";
import {IAuth} from "../../interfaces/IAuth";
import {AuthActionTypes} from "../actions/actionTypes/authActionTypes";
import {authAPI} from "../../api/api";
import {Dispatch} from "react";


let initialState:IAuth = {
    email: null,
    id: null,
    login: null,
    isAuth:false
};

export function authReducer(state = initialState, action:IAction):IAuth{
    switch (action.type){
        case AuthActionTypes.SET_AUTH_USER_DATA:{
            return {
                ...state,
                ...action.payload
            };
        }
        default:{
            return state;
        }
    }
}

export const setAuthUserData = ({id, email, login}:IAuth):IAction=>({
    type:AuthActionTypes.SET_AUTH_USER_DATA,
    payload:{
        id,
        email,
        login,
        isAuth:true
    }
})

export const getAuthUserData = () => (dispatch:Dispatch<any>) => {
    authAPI.getAuthUserData()
        .then((response) => {
            if(response.resultCode === 0){
                dispatch(setAuthUserData(response.data));
            }
        })
}