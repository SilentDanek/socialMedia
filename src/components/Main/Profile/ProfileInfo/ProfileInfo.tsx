import s from "./ProfileInfo.module.css";

interface IProfileInfo{
    profileInfo:{
        wallpaperURL:string;
        avatarURL: string;
        nickName:string;
    }
}

function ProfileInfo(props:IProfileInfo) {
    const profileInfo = props.profileInfo;

    return(
        <div className={s.profile}>
            <div className={s.wallpaper}>

            </div>
            <div className={s.profileInfo}>
                <img
                    className={s.avatar}
                    src={profileInfo.avatarURL}
                    alt="Avatar"
                />
                <span>{profileInfo.nickName}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;