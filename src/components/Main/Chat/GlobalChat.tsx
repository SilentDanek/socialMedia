import { useEffect } from 'react';
import {
    boundThunks,
    boundActions,
    getChatMessages,
    getChatStatus,
    useAppSelector
} from '../../../redux';
import { Chat } from '../../common';

const GlobalChat = () => {
    const status = useAppSelector(getChatStatus);
    const messages = useAppSelector(getChatMessages);

    const { startMessagesListening, stopMessagesListening } = boundThunks.chatThunks;
    const { clearMessages } = boundActions.chatActions;

    const { sendMessage } = boundThunks.chatThunks;

    useEffect(() => {
        startMessagesListening();

        return () => {
            clearMessages();
            stopMessagesListening();
        };
    }, []);

    return (
        <Chat
            blockSubmitButton={status !== 'ready'}
            sendMessage={sendMessage}
            error={status === 'error'}
            messages={messages}
        />
    );
};

export default GlobalChat;
