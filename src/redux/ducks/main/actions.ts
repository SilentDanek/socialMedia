import { MainActionTypes } from './actionTypes';

export const mainActions = {
    initialized: () =>
        ({
            type: MainActionTypes.INITIALIZED,
            payload: { isInitialized: true }
        }) as const
};
