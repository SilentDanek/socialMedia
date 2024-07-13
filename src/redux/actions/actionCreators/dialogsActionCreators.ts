import IAction from "../IAction";
import DialogsActionTypes from "../actionTypes/dialogsActionTypes";

export const updateNewMessageBody = (text: string): IAction => ({
    type: DialogsActionTypes.UPDATE_NEW_MASSAGE_BODY,
    payload: { text }
});

export const sendMessage = (): IAction => ({
    type: DialogsActionTypes.SEND_MESSAGE,
    payload: { text:"" }
});
