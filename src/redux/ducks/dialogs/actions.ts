import {DialogsActionTypes} from "./actionTypes";
import {SendMessageAction} from "./types";


export const sendMessage = (message: string): SendMessageAction => ({
    type: DialogsActionTypes.SEND_MESSAGE,
    payload: { message }
});