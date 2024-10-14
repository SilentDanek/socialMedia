import { rootReducer, store } from './store';

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
    ? U
    : never;
