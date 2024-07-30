import {NavLink} from "react-router-dom";
import s from "./DialogItem.module.css"

interface IUser {
    id:number;
    name:string;
}

export function DialogItem(props:IUser){
    const path = "/dialogs/" + props.id;

    return(
        <div className={s.dialog}>
            <NavLink to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}