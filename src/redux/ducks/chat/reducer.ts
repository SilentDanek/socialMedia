import { v1 } from 'uuid';
import { ChatActionTypes } from './actionTypes';
import { ChatActions, ChatState } from './types';

const initialState: ChatState = {
    messages: [],
    status: 'pending'
};

export const chatReducer = (state = initialState, action: ChatActions): ChatState => {
    switch (action.type) {
        case ChatActionTypes.MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map((m) => ({ ...m, id: v1() }))
                ]
            };
        case ChatActionTypes.STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            };
        case ChatActionTypes.CLEAR_MESSAGES:
            return {
                ...state,
                messages: []
            };
        default:
            return state;
    }
};
