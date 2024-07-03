import IAction from "../IAction";
import DialogsActionTypes from "../actionTypes/dialogsActionTypes";

export const updateNewMessageBodyAction = (text: string): IAction => ({
    type: DialogsActionTypes.UPDATE_NEW_MASSAGE_BODY,
    payload: { text }
});

export const createSendMessageAction = (): IAction => ({
    type: DialogsActionTypes.SEND_MESSAGE,
    payload: { text:"" }
});
