import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message}    from "./Message/Message";
import React from "react";

interface IUsers {
    id: number,
    name: string
}
function dialogsElements(users: IUsers[]) {
    return users.map(({name, id}) => <DialogItem name={name} id={id}/>);
}

interface IMessages {
    id: number,
    message: string
}
function messagesElements(messages: IMessages[]) {
    return messages.map((m) => <Message message={m.message}/>);
}

export function Dialogs(props: any) {
    const state = props.dialogsPage;

    function onSendMessageClick() {
        props.sendMessage();
    }

    function onNewMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const text = e.target.value;
        props.updateNewMessageBody(text)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements(state.dialogs)}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements(state.messages)}
                </div>
                <div>
                    <div>
                        <textarea
                            onChange={onNewMessageChange}
                            placeholder={"Type your message"}
                            value={state.newMessageBody}
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}