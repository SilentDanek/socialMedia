import {IAction} from "../../interfaces/IAction";
import {IAuth} from "../../interfaces/IAuth";
import {AuthActionTypes} from "../actions/actionTypes/authActionTypes";


let initialState:IAuth = {
    email: null,
    id: null,
    login: null
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