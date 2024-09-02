import {NavLink} from "react-router-dom";
import s from "./DialogItem.module.css"
import {FC} from "react";

type User = {
    id: number;
    name: string;
};
export const DialogItem: FC<User> = ({id, name}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + id}>
                {name}
            </NavLink>
        </div>
    );
};