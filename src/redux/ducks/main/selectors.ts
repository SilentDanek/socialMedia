import { State } from '../../types';

export const getIsInitialized = (state: State) => state.main.isInitialized;
export const getErrorPageMessage = (state: State) => state.main.errorPageMassage;
