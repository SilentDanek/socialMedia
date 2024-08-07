import {IUser} from "../../../interfaces/IUsersPage";
import s from "./Users.module.css"
import {NavLink} from "react-router-dom";
import unknownUserSVG from "../../../assets/images/unknown-user.svg"
import React from "react";

export function Users(props: any) {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (
        <div>
            <div className={s.pageSeqContainer}>
                {
                    pages.map((page) => {
                        return <a
                            key={page}
                            className={((props.currentPage === page) ? s.selectedPage : "") + " " + s.pageButton}
                            onClick={() => props.onPageChanged(page)}
                        >{page}</a>
                    })
                }
            </div>
            {props.users.map((user: IUser) => (
                <section key={user.id} className={s.userSection}>
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
                                <button disabled={props.followingInProgress.some((id: number) => id === user.id)}
                                        onClick={() => props.unfollow(user.id)}>Unfollow</button> :
                                <button disabled={props.followingInProgress.some((id: number) => id === user.id)}
                                        onClick={() => props.follow(user.id)}>Follow</button>}
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
            ))}
        </div>
    )
}