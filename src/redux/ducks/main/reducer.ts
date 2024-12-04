import { MainActionTypes } from './actionTypes';
import { MainState, MainAction } from './types';

const initialState: MainState = {
    isInitialized: false
};

export const mainReducer = (state = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.INITIALIZED: {
            return {
                ...state,
                isInitialized: action.payload.isInitialized
            };
        }
        default: {
            return state;
        }
    }
};
