import {DialogsActionTypes} from "./actionTypes";


export const dialogsActions = {
    sendMessage:(message: string) => ({
        type: DialogsActionTypes.SEND_MESSAGE,
        payload: { message }
    } as const)
}