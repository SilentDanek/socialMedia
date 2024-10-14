import { ThunkAction } from 'redux-thunk';
import { State } from '../../types';
import { ChatActions } from './types';
import { chatAPI, ChatMessageAPIType, StatusType } from '../../../api/chatAPI';
import { Dispatch } from 'redux';
import { chatActions } from './actions';

type ChatThunk = ThunkAction<Promise<void>, State, unknown, ChatActions>;

export const startMessagesListening = (): ChatThunk => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ChatThunk => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ChatThunk =>
    async () => {
        chatAPI.sendMessage(message);
    };

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(chatActions.statusChanged(status));
        };
    }
    return _statusChangedHandler;
};

export const chatThunks = {
    startMessagesListening,
    stopMessagesListening,
    sendMessage
};
