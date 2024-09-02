/*todo: Попробовать еще раз реализовать типизацию (проблема ключей)*/
import {AppDispatch} from "./types";
import {bindActionCreators} from "redux";

export const bindAllActionCreators = (actionsBundle: any, dispatch: AppDispatch): any => {
    const bindedActions:any = {};
    for (const key of Reflect.ownKeys(actionsBundle) as string[]) {
        if (typeof actionsBundle[key] === 'object') {
            // Рекурсивный вызов для вложенных объектов
            bindedActions[key] = bindAllActionCreators(actionsBundle[key], dispatch);
        } else if (typeof actionsBundle[key] === 'function') {
            // Привязываем только функции (экшен-криейторы)
            bindedActions[key] = bindActionCreators(actionsBundle[key], dispatch);
        }
    }
    return bindedActions;
}