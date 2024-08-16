import {IAction} from "../../interfaces/IAction";
import {DialogsActionTypes} from "../actions/actionTypes/dialogsActionTypes";

export interface IDialog {
    id: number;
    name: string;
}

export interface IMessage {
    id: number;
    message: string;
}

export interface IDialogsPage {
    dialogs: IDialog[];
    messages: IMessage[];
}
let initialState:IDialogsPage = {
    dialogs: [
        {id: 1, name: "Ярик"},
        {id: 2, name: "Саша"},
        {id: 3, name: "Славик"},
        {id: 4, name: "Миша"}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Привет"},
    ]
};

export function dialogsReducer(state = initialState, action:IAction):IDialogsPage{
    switch (action.type){
        case DialogsActionTypes.SEND_MESSAGE:{
            const newMessage = {
                id: 4,
                // @ts-ignore
                message:action.payload.text
            }
            return {
                ...state,
                messages: state.messages.concat(newMessage),
            };
        }
        default:{
            return state;
        }
    }
}

export const sendMessage = (text: string): IAction => ({
    type: DialogsActionTypes.SEND_MESSAGE,
    payload: { text }
});
