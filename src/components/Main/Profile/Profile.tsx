import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

interface IProfileInfo {
    wallpaperURL: string;
    avatarURL: string;
    nickName: string;
}



function Profile(props: any) {
    const profileInfo:IProfileInfo = props.profilePage.profileInfo;
    return (
        <div className={s.profileWrapper}>
            <ProfileInfo profileInfo = {profileInfo}/>
            <MyPosts
                posts    = {props.profilePage.posts}
                newPostText ={props.profilePage.newPostText}
                dispatch = {props.dispatch}
            />
        </div>
    )
}

export default Profile;