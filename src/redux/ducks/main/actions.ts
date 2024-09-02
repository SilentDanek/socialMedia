import {MainActionTypes} from "./actionTypes";


export const mainActions = {
    initialized: () => ({
        type: MainActionTypes.INITIALIZED,
        payload: {isInitialized: true}
    } as const),
    setErrorPageMessage: (errorPageMassage:string) => ({
        type: MainActionTypes.SET_ERROR_PAGE_MESSAGE,
        payload: {errorPageMassage}
    } as const)
};