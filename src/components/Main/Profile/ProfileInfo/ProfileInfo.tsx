import s from "./ProfileInfo.module.css";

interface IProfileInfo {
    wallpaperURL: string;
    photoURL: string;
    fullName: string;
}

function ProfileInfo(props: IProfileInfo) {
    return (
        <div className={s.profile}>
            <div className={s.wallpaper}/>
            <div className={s.profileInfo}>
                <img
                    className={s.avatar}
                    src={props.photoURL}
                    alt="Avatar"
                />
                <span>{props.fullName}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;