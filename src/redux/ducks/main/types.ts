import { InferActionsTypes } from '../../types';
import { mainActions } from './actions';

export type MainState = {
    isInitialized: boolean;
};

export type MainAction = InferActionsTypes<typeof mainActions>;
