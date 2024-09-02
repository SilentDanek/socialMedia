import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {FC} from "react";
import {useAuthRedirect} from "../../../hooks/useAuthRedirect";
import {useAppSelector, bindedActions, getDialogsPage} from "../../../redux";

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
    useAuthRedirect();

    const dialogsPage = useAppSelector(getDialogsPage);
    const {sendMessage} = bindedActions.dialogsActions;

    type formValues = {
        newMessageBody: string;
    }
    const handleSubmit = (values: formValues) => {
        sendMessage(values.newMessageBody)
    };
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
            <AddMessageForm onSubmit={handleSubmit}/>
        </div>
    )
};

export default Dialogs;