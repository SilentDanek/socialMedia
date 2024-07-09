import {IUser} from "../../../interfaces/IUsersPage";
import s from "./Users.module.css"

export function Users(props: any) {
    function createUsersSection(user: IUser) {
        return (
            <section key={user.id} className={s.userSection}>
                <div>
                    <div>
                        <img src={user.photoURL} alt="user photo"/>
                    </div>
                    <div>
                        {user.followed?
                            <button onClick={() => props.unfollow(user.id)}>Followed</button>:
                            <button onClick={() => props.follow(user.id)}>Unfollowed</button>}
                    </div>
                </div>
                <div className={s.userContent}>
                    <div className={s.userInfo}>
                        <div><b>{user.fullname}</b></div>
                        <div>{user.status}</div>
                    </div>
                    <div>
                        <div>{user.location.country}</div>
                        <div>{user.location.city}</div>
                    </div>
                </div>

            </section>
        )
    }

    return (
        <div>
            {props.users.map(createUsersSection)}
        </div>
    )
}

