import { chatReducer } from './reducer.ts';
import { ChatMessageType, ChatState } from './types';
import { v1 } from 'uuid';
import { chatActions } from './actions.ts';

jest.mock('uuid', () => ({
    v1: jest.fn(() => 'mocked-uuid')
}));

describe('chatReducer', () => {
    const initialState: ChatState = {
        messages: [],
        status: 'pending'
    };

    test('should handle MESSAGES_RECEIVED', () => {
        const mockMessages: ChatMessageType[] = [
            { userName: 'User1', message: 'Hello', id: v1(), userId: +v1(), photo: '' },
            { userName: 'User2', message: 'Hi', id: v1(), userId: +v1(), photo: '' }
        ];

        const action = chatActions.messagesReceived(mockMessages);

        const expectedState: ChatState = {
            messages: [
                {
                    userName: 'User1',
                    message: 'Hello',
                    id: 'mocked-uuid',
                    userId: +v1(),
                    photo: ''
                },
                { userName: 'User2', message: 'Hi', id: 'mocked-uuid', userId: +v1(), photo: '' }
            ],
            status: 'pending'
        };

        const newState = chatReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('should handle STATUS_CHANGED', () => {
        const action = chatActions.statusChanged('ready');

        const expectedState: ChatState = {
            ...initialState,
            status: 'ready'
        };

        const newState = chatReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('should handle CLEAR_MESSAGES', () => {
        const action = chatActions.clearMessages();

        const stateWithMessages: ChatState = {
            messages: [
                { userName: 'User1', message: 'Hello', id: v1(), userId: +v1(), photo: '' },
                { userName: 'User2', message: 'Hi', id: v1(), userId: +v1(), photo: '' }
            ],
            status: 'pending'
        };

        const expectedState = {
            ...initialState,
            messages: []
        };

        const newState = chatReducer(stateWithMessages, action);
        expect(newState).toEqual(expectedState);
    });

    test('should return the initial state when state is undefined', () => {
        const action = { type: 'UNKNOWN_ACTION' };

        const newState = chatReducer(undefined, action as any);
        expect(newState).toEqual(initialState);
    });
});
