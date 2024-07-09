import IAction from "../IAction";
import DialogsActionTypes from "../actionTypes/dialogsActionTypes";

export const newMessageBodyAC = (text: string): IAction => ({
    type: DialogsActionTypes.UPDATE_NEW_MASSAGE_BODY,
    payload: { text }
});

export const sendMessageAC = (): IAction => ({
    type: DialogsActionTypes.SEND_MESSAGE,
    payload: { text:"" }
});
