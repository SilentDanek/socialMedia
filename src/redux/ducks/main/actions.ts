import {MainActionTypes} from "./actionTypes";
import {InitializedAction, SetErrorMessageAction} from "./types";


export const initialized = ():InitializedAction => ({
    type: MainActionTypes.INITIALIZED,
    payload: {isInitialized: true}
});

export const setErrorPageMessage = (errorPageMassage:string):SetErrorMessageAction => ({
    type: MainActionTypes.SET_ERROR_PAGE_MESSAGE,
    payload: {errorPageMassage}
});