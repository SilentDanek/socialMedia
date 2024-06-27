import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props: any) {
    const profileInfo = props.profileInfo;
    return (
        <div className={s.profileWrapper}>
            <ProfileInfo
                avatarURL={profileInfo.avatarURL}
                wallpaperURL={profileInfo.wallpaperURL}
                nickName={profileInfo.nickName
                }/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}

export default Profile;