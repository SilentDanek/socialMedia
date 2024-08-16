import {IAction} from "../../interfaces/IAction";
import {getAuthUserData} from "./authReduced";

enum MainActionTypes {
    INITIALIZED = "INITIALIZED",
}

export interface IMain {
    isInitialized: boolean;
}
let initialState:IMain = {
    isInitialized: false,
};

export function mainReducer(state = initialState, action:IAction):IMain{
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

export const initialize = () => async (dispatch:(thunk:any) => Promise<any>) =>{
    await dispatch(getAuthUserData());
    await dispatch(initialized());
}
