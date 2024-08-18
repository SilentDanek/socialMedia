import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import AddMessageForm from "./AddMessageForm/addMessageForm";

interface IUsers {
    id: number,
    name: string
}
const dialogsElements = (users: IUsers[]) => {
    return users.map(({name, id}) => <DialogItem name={name} id={id}/>);
}

interface IMessages {
    id: number,
    message: string
}
const messagesElements = (messages: IMessages[]) => {
    return messages.map((m) => <Message message={m.message}/>);
}


export const Dialogs = (props: any) => {
    const state = props.dialogsPage;

    const onSubmit = (values:any) => {
        props.sendMessage(values.newMessageBody);
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements(state.dialogs)}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements(state.messages)}
                </div>
            </div>
            <AddMessageForm onSubmit={onSubmit}/>
        </div>
    )
}