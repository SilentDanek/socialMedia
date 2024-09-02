import {InferActionsTypes} from "../../types";
import {authActions} from "./actions";


export type AuthState = {
    id: number | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};


export type AuthAction = InferActionsTypes<typeof authActions>;