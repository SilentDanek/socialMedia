import {InferActionsTypes} from "../../types";
import {dialogsActions} from "./actions";


export type Dialog = {
    id: number;
    name: string;
};
export type Message = {
    id: number;
    message: string;
};
export type DialogsState = {
    dialogs: Dialog[];
    messages: Message[];
};

export type DialogsAction = InferActionsTypes<typeof dialogsActions>;