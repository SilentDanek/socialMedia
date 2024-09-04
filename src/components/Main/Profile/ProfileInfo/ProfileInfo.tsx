import s from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg";
import { ChangeEvent, FC, memo, useState } from "react";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";
import { ProfileData } from "./ProfileData/ProfileData";
import { bindedThunks, useAppSelector, getUserStatus, UserProfile } from "../../../../redux";

type ProfileInfoProps = {
    profile: UserProfile;
    isOwner: boolean;
}
export const ProfileInfo: FC<ProfileInfoProps> = memo(({ profile, isOwner }) => {
    const [editMode, setEditMode] = useState(false);

    const status = useAppSelector(getUserStatus);
    const { updateStatus, updatePhoto } = bindedThunks.profileThunks;

    const handleUpdatePhotoOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    {isOwner && <input type={"file"} onChange={handleUpdatePhotoOnChange} />}
                </div>
                <div>
                    <div>
                        {profile.fullName}
                    </div>
                    <ProfileStatus status={status} updateStatus={updateStatus} />
                    {editMode
                        ? <ProfileDataForm profile={profile} setEditMode={setEditMode}  />
                        : <ProfileData profile={profile} goToEditMode={goToEditMode}  isOwner={isOwner} />}
                </div>
            </div>
        </div>
    );
});