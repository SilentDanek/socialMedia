import s from "./Message.module.css";

type message={
    message:string;
}

function Message(props:message){
    return(
        <div className={s.message}>
            {props.message}
        </div>
    )
}


export default Message;