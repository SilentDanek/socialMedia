import {IAction} from "../../interfaces/IAction";
import {IMainPreload} from "../../interfaces/IMainPreload";
import {MainActionTypes} from "../actions/actionTypes/mainActionTypes";
import {getAuthUserData} from "./authReduced";


let initialState:IMainPreload = {
    isInitialized: false,
};


export function mainReducer(state = initialState, action:IAction):IMainPreload{
    switch (action.type){
        case MainActionTypes.INITIALIZED:{
            return {
                ...state,
                //@ts-ignore
                isInitialized:action.payload.isInitialized
            };
        }
        default:{
            return state;
        }
    }
}

export const initialized = (): IAction => ({
    type: MainActionTypes.INITIALIZED,
    payload: {isInitialized: true}
});

export const initialize = () => (dispatch:(thunk:any) => Promise<any>) =>{
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(initialized());
        });
}
