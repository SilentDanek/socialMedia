import { InferActionsTypes } from '../../types';
import { ChatMessageAPIType, StatusType } from '../../../api/chatAPI';
import { chatActions } from './actions';

export type ChatMessageType = ChatMessageAPIType & { id: string };

export type ChatState = {
    messages: ChatMessageType[];
    status: StatusType;
};

export type ChatActions = InferActionsTypes<typeof chatActions>;
