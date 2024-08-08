import React from "react";
import {Navigate} from "react-router-dom";

type redirectStatus = {
    isAuth:boolean;
    [key: string]: any;
}

export function withAuthRedirect(Component:React.ComponentType<any>){
    return function RedirectComponent(props:redirectStatus){
        if(!props.isAuth){
            return <Navigate to="/login"/>;
        }
        return <Component {...props}/>;
    }
}