import {DialogsActionTypes} from "./actionTypes";


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

export type SendMessageAction ={
    type: DialogsActionTypes.SEND_MESSAGE;
        payload: { message:string };
};
export type DialogsAction = SendMessageAction;