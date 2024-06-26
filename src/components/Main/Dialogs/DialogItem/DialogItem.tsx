import s from "./DialogItem.module.css"
import {NavLink} from "react-router-dom";

type user = {
    id:number;
    name:string;
}

function DialogItem(props:user){
    const path = "/dialogs/" + props.id;

    return(
        <div className={s.dialog}>
            <NavLink to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;