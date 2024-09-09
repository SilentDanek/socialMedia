import { TextareaFL } from "../../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { FC, useEffect } from "react";
import { bindedActions, bindedThunks, getChatMessages, getChatStatus, useAppSelector } from "../../../redux";
import { NavLink } from "react-router-dom";
import unknownUserSVG from "../../../assets/images/unknown-user.svg";

const Chat = () => {
    const status = useAppSelector(getChatStatus);
    const { startMessagesListening, stopMessagesListening } = bindedThunks.chatThunks;
    const { clearMessages } = bindedActions.chatActions;

    // Create connection by WebSocket and get messages
    useEffect(() => {
        startMessagesListening();

        return () => {
            clearMessages();
            stopMessagesListening();
        };
    }, []);

    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <Messages />
        <AddNewMessageForm />
    </div>
};

const AddNewMessageForm:FC = () => {
    const methods = useForm<FieldValues>();
    const status = useAppSelector(getChatStatus);
    const {sendMessage} = bindedThunks.chatThunks


    const sendMessageHandler = ({newMessage}: FieldValues) => {
        if (!newMessage) {
            return
        }
        sendMessage(newMessage);
        methods.resetField("newMessage");
    }

    return <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(sendMessageHandler)}>
            <TextareaFL<FieldValues> name={"newMessage"} placeholder={"Message"} />
            <button disabled={status !== "ready"} type={"submit"}>Send</button>
        </form>
    </FormProvider>;
};

const Messages: FC = () => {
    const messages = useAppSelector(getChatMessages);

    return <section>
        {messages.map(m => <Message key={m.id} {...m} />)}
    </section>;
};

const Message: FC<Message> = ({ message, photo, userId, userName }) => {
    return <article>
        <span>
            <NavLink to={`/profile/${userId}`}>
                <img src={photo || unknownUserSVG} alt={`${userId} avatar`} height={"75px"} />
            </NavLink>
        </span>
        <span>
            <div>{userName}</div>
            <span>{message}</span>
        </span>
    </article>;
};






type FieldValues = {
    newMessage: string;
};

type Message = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export default Chat;