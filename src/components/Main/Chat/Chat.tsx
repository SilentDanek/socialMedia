import { useEffect } from "react";
import { bindedActions, bindedThunks, getChatStatus, useAppSelector } from "../../../redux";
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";
import { AddNewMessageForm } from "./AddNewMessageForm/AddNewMessageForm";
import { Messages } from "./Messages/Messages";
import { Stack } from "@mui/material";

const Chat = () => {
    const status = useAppSelector(getChatStatus);
    const { startMessagesListening, stopMessagesListening } = bindedThunks.chatThunks;
    const { clearMessages } = bindedActions.chatActions;

    useAuthRedirect();

    useEffect(() => {
        startMessagesListening();

        return () => {
            clearMessages();
            stopMessagesListening();
        };
    }, []);

    return <Stack flexDirection="column" justifyContent="flex-end" sx={{height:"100%"}}>
        {status === "error" && <div>Some error occurred. Please refresh the page</div>}
        <Messages />
        <AddNewMessageForm />
    </Stack>;
};


export default Chat;