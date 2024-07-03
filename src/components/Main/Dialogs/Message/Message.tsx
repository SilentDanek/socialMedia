import s from "./Message.module.css";

interface IMessage {
    message:string;
}

function Message(props:IMessage){
    return(
        <div className={s.message}>
            {props.message}
        </div>
    )
}


export default Message;