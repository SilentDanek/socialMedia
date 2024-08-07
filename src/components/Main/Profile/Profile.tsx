import s from "./Profile.module.css"
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Preloader} from "../../common/Preloader/Preloader";

export function Profile(props: any) {
    return (
        props.profile ?
            <div className={s.profileWrapper}>
                <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                <MyPostsContainer/>
            </div> :
            <Preloader/>
    )
}