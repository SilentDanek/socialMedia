import { useEffect } from 'react';
import {
    bindedThunks,
    boundActions,
    getAuthUserId,
    getChatMessages,
    getChatStatus,
    useAppSelector
} from '../../../redux';
import { Messages } from './Messages/Messages';
import { Stack } from '@mui/material';
import { AddNewMessageForm } from '../../common/AddNewMessageForm/AddNewMessageForm.tsx';

const Chat = () => {
    const status = useAppSelector(getChatStatus);
    const messages = useAppSelector(getChatMessages);
    const authUserId = useAppSelector(getAuthUserId);

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


    return <Stack flexDirection="column" justifyContent="flex-end" sx={{
        height:"100%",
        margin: {
            xs: '0 1% 5px 1%',
            md: '0 25% 5px 15%'
        },}}>
        {status === "error" && <div>Some error occurred. Please refresh the page</div>}
        <Messages messages={messages} authUserId={authUserId}/>
        <AddNewMessageForm sendMessage={sendMessage} blockSubmit={status !== 'ready'}/>
    </Stack>;
};


export default Chat;