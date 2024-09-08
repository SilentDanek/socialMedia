import { TextareaFL } from "../../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useFormAction } from "react-router-dom";

type FieldValues = {
    newMessage: string;
};

type Message = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

function tag(strings:TemplateStringsArray) {
    return strings.raw;
}


console.log(tag`string text line 1 \n string text line 2`);

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');


const Message: FC<Message> = ({ message, photo, userId, userName }) => {
    return <article>
        <span>
            <img src={photo} alt="" height={"75px"}/>
        </span>
        <span>
            <div>{userName}</div>
            <span>{message}</span>
        </span>
    </article>;
};

const Messages: FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(
        () => {
            const handleNewMessage = (e:MessageEvent) => {
                console.log(e);
                setMessages(actualMessages => [...actualMessages, ...JSON.parse(e.data)]);
            };

            ws.addEventListener("message", handleNewMessage);
        },[]
    )
    useFormAction()
    console.log(messages);
    return <section>{
        messages.map(m => <Message key={m.userId + m.message} {...m} />)
    }
    </section>;
};

const AddNewMessageForm = () => {
    const methods = useForm<FieldValues>();
    return <FormProvider {...methods}>
        <form>
            <TextareaFL<FieldValues> name={"newMessage"} placeholder={"Message"} />
            <button type={"submit"}>Send</button>
        </form>
    </FormProvider>;
};


const Chat = () => {
    return <div>
        <Messages />
        <AddNewMessageForm />
    </div>;
};

export default Chat;