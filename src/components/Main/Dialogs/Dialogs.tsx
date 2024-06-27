import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

function dialogsElements(users:any) {
    return users.map(({name, id}:any) => <DialogItem name={name} id={id}/>);
}

function messagesElements(messages:string[]) {
    return messages.map((message) => <Message message={message}/>);
}

function Dialogs(props:any){
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements(props.dialogs)}
            </div>
            <div className={s.messages}>
                {messagesElements(props.messages)}
            </div>
        </div>
    )
}

export default Dialogs;