import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


function Profile(props:any) {
    const state = props.store.getState();
    const profileInfo = state.profilePage.profileInfo;
    return (
        <div className={s.profileWrapper}>
            <ProfileInfo profileInfo = {profileInfo}/>
            <MyPostsContainer store = {props.store}/>
        </div>
    )
}

export default Profile;