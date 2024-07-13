import {IUser} from "../../../interfaces/IUsersPage";
import s from "./Users.module.css"


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
            {
                props.users.map((user: IUser) => {
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
                                    <div>{user.location.country}</div>
                                    <div>{user.location.city}</div>
                                </div>
                            </div>
                        </section>
                    )
                })
            }
        </div>
    )
}