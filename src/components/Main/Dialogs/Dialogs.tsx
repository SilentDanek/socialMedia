import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {createSendMessageAction, updateNewMessageBodyAction} from "../../../redux/actions/actionCreators/dialogsActionCreators";

interface IUsers{
    id:number,
    name:string
}
function dialogsElements(users:IUsers[]) {
    return users.map(({name, id}) => <DialogItem name={name} id={id}/>);
}

interface IMessages{
    id:number,
    message:string
}
function messagesElements(messages:IMessages[]) {
    return messages.map((m) => <Message message={m.message}/>);
}

function Dialogs(props:any){
    const state = props.dialogsPage;


    function onSendMessageClick(){
        const action = createSendMessageAction();

        props.dispatch(action);
    }

    function onNewMessageChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        const text = e.target.value;
        const action = updateNewMessageBodyAction(text);
        props.dispatch(action)
    }

    return(
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
                            placeholder={"Enter your message"}
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

export default Dialogs;