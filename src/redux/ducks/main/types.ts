import { InferActionsTypes } from '../../types';
import { mainActions } from './actions';

export type MainState = {
    isInitialized: boolean;
    errorPageMassage: string;
};

export type MainAction = InferActionsTypes<typeof mainActions>;
