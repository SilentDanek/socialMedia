import s from "./User.module.css"
import {NavLink} from "react-router-dom";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg"
import {TUser} from "../../../../redux/ducks/users/types";
import {FC} from "react";

type UserProps = {
    user:TUser;
    follow:(id:number) => void;
    unfollow:(id:number) => void;
    followingInProgress:number[];
};
export const User:FC<UserProps> = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <section className={s.userSection}>
            <div>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            src={user.photos.large || unknownUserSVG}
                            alt="user photo"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                onClick={() => unfollow(user.id)}>Unfollow</button> :
                        <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                onClick={() => follow(user.id)}>Follow</button>}
                </div>
            </div>
            <div className={s.userContent}>
                <div className={s.userInfo}>
                    <div><b>{user.name}</b></div>
                    <div>{user.status}</div>
                </div>
                <div>
                    {/*<div>{user.location.country}</div>
                                    <div>{user.location.city}</div>*/}
                </div>
            </div>
        </section>
    )
}