import s from "./ProfileInfo.module.css";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg"
import {ChangeEvent, FC, memo, useState} from "react";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData"
import {UserProfile} from "../../../../redux/ducks/profile/types";

type ProfileInfoProps = {
    profile: UserProfile;
    status: string;
    updateStatus: () => void;
    updatePhoto: (photos:FormData) => void;
    updateUserProfile: (formData:any) => Promise<void>;
    isOwner: boolean;
}
export const ProfileInfo:FC<ProfileInfoProps> = memo(({updatePhoto, updateStatus, updateUserProfile, profile, status, isOwner}) => {
    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData:any) => {
        updateUserProfile(formData).then(
            () => {
                setEditMode(false);
            }
        ).catch(console.warn);
    };

    const onUpdatePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;

        const file = new FormData();
        file.append("image", e.target.files[0]);

        updatePhoto(file);
    };

    const goToEditMode = () => setEditMode(true);

    return (
        <div className={s.profile}>
            <div className={s.profileInfo}>
                <div>
                    <img
                        className={s.avatar}
                        src={profile.photos.large || unknownUserSVG}
                        alt="Avatar"
                    />
                    {isOwner && <input type={"file"} onChange={onUpdatePhoto}/>}
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



