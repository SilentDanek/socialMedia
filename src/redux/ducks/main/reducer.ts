import { MainActionTypes } from './actionTypes';
import { MainState, MainAction } from './types';

const initialState: MainState = {
    isInitialized: false,
    errorPageMassage: '404 NOT FOUND'
};

export const mainReducer = (state = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.INITIALIZED: {
            return {
                ...state,
                isInitialized: action.payload.isInitialized
            };
        }
        case MainActionTypes.SET_ERROR_PAGE_MESSAGE: {
            return {
                ...state,
                errorPageMassage: action.payload.errorPageMassage
            };
        }
        default: {
            return state;
        }
    }
};
