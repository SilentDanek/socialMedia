import { useEffect } from 'react';
import {
    bindedThunks,
    boundActions,
    getChatMessages,
    getChatStatus,
    useAppSelector
} from '../../../redux';
import { Chat } from '../../common';

const GlobalChat = () => {
    const status = useAppSelector(getChatStatus);
    const messages = useAppSelector(getChatMessages);

    const { startMessagesListening, stopMessagesListening } = bindedThunks.chatThunks;
    const { clearMessages } = boundActions.chatActions;

    const { sendMessage } = bindedThunks.chatThunks;

    useEffect(() => {
        startMessagesListening();

        return () => {
            clearMessages();
            stopMessagesListening();
        };
    }, []);

    return <Chat blockSubmitButton={status !== 'ready'}
                 sendMessage={sendMessage}
                 error={status === "error"}
                 messages={messages}
    />;
};


export default GlobalChat;