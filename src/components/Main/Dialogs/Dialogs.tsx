import s from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { MessageForm } from "./MessageForm/MessageForm";
import { FC } from "react";
import { getDialogsPage, useAppSelector } from "../../../redux";

type Users = {
    id: number;
    name: string;
};
const dialogsElements = (users: Users[]) => {
    return users.map(({name, id}) => <DialogItem key={id} name={name} id={id}/>);
};

type Messages = {
    id: number;
    message: string;
};
const messagesElements = (messages: Messages[]) => {
    return messages.map(({message, id}) => <Message key={id} message={message}/>);
};


const Dialogs: FC = () => {

    const dialogsPage = useAppSelector(getDialogsPage);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements(dialogsPage.dialogs)}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements(dialogsPage.messages)}
                </div>
            </div>
            <MessageForm/>
        </div>
    )
};

export default Dialogs;