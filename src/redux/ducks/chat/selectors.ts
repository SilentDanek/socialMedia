import { State } from '../../types';

export const getChatStatus = (state: State) => state.chat.status;

export const getChatMessages = (state: State) => state.chat.messages;
