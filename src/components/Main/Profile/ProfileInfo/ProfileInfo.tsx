import s from "./ProfileInfo.module.css";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg"
import React, {memo} from "react";

export const ProfileInfo = React.memo((props: any) => {
    return (
        <div className={s.profile}>
            <div className={s.profileInfo}>
                <img
                    className={s.avatar}
                    src={props.profile.photos.large || unknownUserSVG}
                    alt="Avatar"
                />
                <div>
                    <span>{props.profile.fullName}</span>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
        </div>
    );
})