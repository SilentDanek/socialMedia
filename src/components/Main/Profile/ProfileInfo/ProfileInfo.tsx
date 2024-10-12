import unknownUserSVG from '../../../../assets/images/unknown-user.svg';
import { FC, useState } from 'react';
import { ProfileDataForm } from './ProfileDataForm';
import { ProfileData } from './ProfileData'
import { ProfileStatus } from './ProfileStatus';
import { AvatarLoader } from './AvatarLoader';
import { boundThunks, getUserStatus, useAppSelector, UserProfile } from '../../../../redux';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProfileContainer } from './ProfileInfo.style';


type ProfileInfoProps = {
    profile: UserProfile;
    isOwner: boolean;
}
export const ProfileInfo: FC<ProfileInfoProps> = ({ profile, isOwner }) => {
    const [editMode, setEditMode] = useState(false);
    const status = useAppSelector(getUserStatus);
    const {t} = useTranslation("profile");

    const { updateStatus } = boundThunks.profileThunks;

    const AvatarComponent = <Avatar src={profile.photos.large || unknownUserSVG} sx={{ width: 120, height: 120 } } />;

    return (
        <ProfileContainer>
            <Stack direction="row" alignItems="center" gap="4%">
                <Box>
                    {isOwner
                        ? <AvatarLoader>{AvatarComponent}</AvatarLoader>
                        : AvatarComponent
                    }
                </Box>
                <Stack>
                    <Typography variant={"h5"}>{profile.fullName}</Typography>
                    <ProfileStatus status={status} updateStatus={updateStatus} />
                    {!editMode && isOwner && <Button sx={{marginTop:2}} variant={"contained"} onClick={() => setEditMode(true)}>
                        {t("edit profile")}
                    </Button>}
                </Stack>
            </Stack>
            {editMode
                ? <ProfileDataForm profile={profile} setEditMode={setEditMode} />
                : <ProfileData profile={profile}/>}
        </ProfileContainer>
    );
};