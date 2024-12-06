import { ChatMessageAPIType, StatusType } from '@api/chatAPI.ts';
import { ChatActionTypes } from './actionTypes';

export const chatActions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({
            type: ChatActionTypes.MESSAGES_RECEIVED,
            payload: { messages }
        }) as const,
    statusChanged: (status: StatusType) =>
        ({
            type: ChatActionTypes.STATUS_CHANGED,
            payload: { status }
        }) as const,
    clearMessages: () =>
        ({
            type: ChatActionTypes.CLEAR_MESSAGES
        }) as const
};
