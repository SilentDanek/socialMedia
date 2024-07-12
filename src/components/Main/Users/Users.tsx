import {IUser} from "../../../interfaces/IUsersPage";
import s from "./Users.module.css"
import React, {useEffect} from "react";


export function Users(props: any) {
    useEffect(() => {
        fetch("https://gist.githubusercontent.com/SilentDanek/f458420ce9ddb9d2d23a2d611c2c3d06/raw/users")
            .then((response) => response.json())
            .then((response) => props.setUsers(response.items));
    }, []);

    return (
        <div>
            {props.users.map((user: IUser) => {
                return (
                    <section key={user.id} className={s.userSection}>
                        <div>
                            <div>
                                <img
                                    src={user.photos.large || "https://i1.sndcdn.com/artworks-ZWMdM4B4RnS3RMmT-LXIgNA-t500x500.jpg"}
                                    alt="user photo"/>
                            </div>
                            <div>
                                {user.followed ?
                                    <button onClick={() => props.unfollow(user.id)}>Followed</button> :
                                    <button onClick={() => props.follow(user.id)}>Unfollowed</button>}
                            </div>
                        </div>
                        <div className={s.userContent}>
                            <div className={s.userInfo}>
                                <div><b>{user.name}</b></div>
                                <div>{user.status}</div>
                            </div>
                            <div>
                                <div>{"user.location.country"}</div>
                                <div>{"user.location.city"}</div>
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}