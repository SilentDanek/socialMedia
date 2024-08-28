import {DialogsActionTypes} from "./actionTypes";
import {DialogsAction,DialogsState} from "./types";


let initialState: DialogsState = {
    dialogs: [
        {id: 1, name: "Ярик"},
        {id: 2, name: "Саша"},
        {id: 3, name: "Славик"},
        {id: 4, name: "Миша"},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Привет"},
    ],
};

export const dialogsReducer = (state = initialState, action:DialogsAction): DialogsState => {
    switch (action.type){
        case DialogsActionTypes.SEND_MESSAGE:{
            const newMessage = {
                id: 4,
                message: action.payload.message
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default:{
            return state;
        }
    }
};