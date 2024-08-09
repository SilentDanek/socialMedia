import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {Field, reduxForm} from "redux-form";

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


const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newMessageBody"} aria-placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm({form:"DialogAddMessageForm"})(AddMessageForm)


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
            <AddMessageFormRedux onSubmit={onSubmit}/>
        </div>
    )
}