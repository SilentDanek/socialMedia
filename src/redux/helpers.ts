import { AppDispatch } from './types';
import { bindActionCreators } from 'redux';

export const bindAllActionCreators = <T extends Record<string, any>>(
    actionsBundle: T,
    dispatch: AppDispatch
): T => {
    const boundActions: Partial<T> = {};
    for (const key of Object.keys(actionsBundle) as Array<keyof T>) {
        if (typeof actionsBundle[key] === 'object') {
            boundActions[key] = bindAllActionCreators(actionsBundle[key], dispatch);
        } else if (typeof actionsBundle[key] === 'function') {
            boundActions[key] = bindActionCreators(actionsBundle[key], dispatch);
        }
    }
    return boundActions as T;
};
