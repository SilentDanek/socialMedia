import s from "./Profile.module.css"
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoContainer} from "./ProfileInfo/ProfileInfoContainer";

export function Profile(props:any) {
    return (
        <div className={s.profileWrapper}>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </div>
    )
}