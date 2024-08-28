import {MainActionTypes} from "./actionTypes";


export type MainState = {
    isInitialized: boolean;
    errorPageMassage: string;
};

export type InitializedAction = {
    type: MainActionTypes.INITIALIZED;
    payload: {isInitialized: true};
};
export type SetErrorMessageAction = {
    type: MainActionTypes.SET_ERROR_PAGE_MESSAGE;
    payload: {errorPageMassage: string};
};
export type MainAction = InitializedAction | SetErrorMessageAction;