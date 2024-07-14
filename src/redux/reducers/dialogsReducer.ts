import {IAction} from "../../interfaces/IAction";
import DialogsActionTypes from "../actions/actionTypes/dialogsActionTypes";
import {IDialogsPage} from "../../interfaces/IDialogsPage";


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
    ],
    newMessageBody:"123321",
};

export function dialogsReducer(state = initialState, action:IAction):IDialogsPage{
    switch (action.type){
        case DialogsActionTypes.SEND_MESSAGE:{
            return sendMassage(state);
        }
        case DialogsActionTypes.UPDATE_NEW_MASSAGE_BODY:{
            return updateNewMassageBody(state, action.payload.text);
        }
        default:{
            return state;
        }
    }
}

function updateNewMassageBody(state:any, newText:string){
    return {
        ...state,
        newMessageBody: newText
    }
}

function sendMassage(state:any) {
    const newMessage = {
        id: 4,
        message:state.newMessageBody
    }

    return {
        ...state,
        messages: state.messages.concat(newMessage),
        newMessageBody: ""
    }
}