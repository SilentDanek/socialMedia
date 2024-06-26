import s from "./ProfileInfo.module.css";

interface IProfileInfo{
    wallpaperURL:string;
    avatarURL: string;
    nickName:string;
}

function ProfileInfo(props:IProfileInfo) {
    return(
        <div className={s.profile}>
            <div className={s.wallpaper}>
                <img
                    src={props.wallpaperURL}
                    alt="wallpaper"
                />
            </div>
            <div className={s.profileInfo}>
                <img
                    src={props.avatarURL}
                    alt="Avatar"
                />
                <span>{props.nickName}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;