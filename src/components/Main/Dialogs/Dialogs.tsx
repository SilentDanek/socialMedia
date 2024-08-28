import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import AddMessageForm from "./AddMessageForm/addMessageForm";
import {FC} from "react";
import {DialogsState} from "../../../redux/ducks/dialogs/types";

type Users = {
    id: number;
    name: string;
};
const dialogsElements = (users: Users[]) => {
    return users.map(({name, id}) => <DialogItem name={name} id={id}/>);
};

type Messages = {
    id: number;
    message: string;
};
const messagesElements = (messages: Messages[]) => {
    return messages.map((m) => <Message message={m.message}/>);
};

type DialogsProps = {
    dialogsPage: DialogsState;
    sendMessage: (message: string) => void;
};
export const Dialogs:FC<DialogsProps> = ({dialogsPage, sendMessage}) => {
    const onSubmit = (values:any) => sendMessage(values.newMessageBody);
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
            <AddMessageForm onSubmit={onSubmit}/>
        </div>
    )
};