import s from "./Message.module.css";
import {FC} from "react";

type Message = {
    message:string;
};
export const Message:FC<Message> = ({message}) => {
    return(
        <div className={s.message}>
            {message}
        </div>
    );
};