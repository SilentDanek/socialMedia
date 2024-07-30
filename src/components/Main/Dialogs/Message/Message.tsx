import s from "./Message.module.css";

interface IMessage {
    message:string;
}

export function Message(props:IMessage){
    return(
        <div className={s.message}>
            {props.message}
        </div>
    )
}