import IAction from "../actions/IAction";
import DialogsActionTypes from "../actions/actionTypes/dialogsActionTypes";

export function dialogsReducer(state:any, action:IAction,){
    switch (action.type){
        case DialogsActionTypes.SEND_MESSAGE:{
            sendMassage(state);
            return state;
        }
        case DialogsActionTypes.UPDATE_NEW_MASSAGE_BODY:{
            updateNewMassageBody(state, action.payload.text);
            return state;
        }
    }
    return state;
}

function updateNewMassageBody(state:any, newText:string){
    state.dialogsPage.newMessageBody = newText;
}

function sendMassage(state:any) {
    const newMessage = {
        id: 4,
        message:state.dialogsPage.newMessageBody
    }
    state.dialogsPage.newMessageBody = "";

    const newMessagesArray = state.dialogsPage.messages.concat(newMessage);

    state.dialogsPage.messages = newMessagesArray;
}