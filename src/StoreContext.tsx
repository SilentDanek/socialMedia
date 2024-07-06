import React from "react";
import { Store } from 'redux';
import IAction from "./redux/actions/IAction";

const StoreContext = React.createContext< Store<any, IAction, unknown> | null>(null);

const Provider = (props:any) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export {StoreContext, Provider}