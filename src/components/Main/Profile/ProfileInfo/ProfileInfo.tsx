import s from "./ProfileInfo.module.css";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg"
import React, {ChangeEvent, memo, useCallback, useState} from "react";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData"

export const ProfileInfo = memo(({updatePhoto, updateStatus, updateUserProfile, profile, status, isOwner}: any) => {
    const [editMode, setEditMode] = useState(false);

    const onSubmit = useCallback((formData:any) => {
        updateUserProfile(formData).then(
            () => {
                setEditMode(false);
            }
        ).catch(console.warn)
    },[updateUserProfile]);

    const onUpdatePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;

        const file = new FormData();
        file.append("image", e.target.files[0]);

        updatePhoto(file);
    }



    const goToEditMode = useCallback(() => {setEditMode(true)},[setEditMode])


    return (
        <div className={s.profile}>
            <div className={s.profileInfo}>
                <div>
                    <img
                        className={s.avatar}
                        src={profile.photos.large || unknownUserSVG}
                        alt="Avatar"
                    />
                    <input type={"file"} onChange={onUpdatePhoto}/>
                </div>
                <div>
                    <div>
                        {profile.fullName}
                    </div>
                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                { editMode
                    //@ts-ignore
                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={goToEditMode} profile={profile} isOwner={isOwner}/> }
                </div>
            </div>
        </div>
    );
})



