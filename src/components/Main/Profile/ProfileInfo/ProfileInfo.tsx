import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg";
import { FC, memo, useState } from "react";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";
import { ProfileData } from "./ProfileData/ProfileData";
import { bindedThunks, getUserStatus, useAppSelector, UserProfile } from "../../../../redux";
import { AvatarLoader } from "./AvatarLoader/AvatarLoader";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { ThemeBox } from "../../../common/ThemeBox";


type ProfileInfoProps = {
    profile: UserProfile;
    isOwner: boolean;
}
export const ProfileInfo: FC<ProfileInfoProps> = memo(({ profile, isOwner }) => {
    const [editMode, setEditMode] = useState(false);
    const status = useAppSelector(getUserStatus);

    const { updateStatus } = bindedThunks.profileThunks;

    const goToEditMode = () => setEditMode(!editMode);

    const avatar = <Avatar src={profile.photos.large || unknownUserSVG} sx={{ width: 120, height: 120 } } />;

    return (
        <ThemeBox sx={{ margin: {sm:0, md:"2px 22% 0 17%" }, padding: "2%" }}>
            <Stack direction="row" alignItems="center" gap="4%">
                <Box >
                    {isOwner
                        ? <AvatarLoader>{avatar}</AvatarLoader>
                        : avatar
                    }
                </Box >
                <Stack>
                    <Typography variant={"h5"}>{profile.fullName}</Typography>
                    <ProfileStatus status={status} updateStatus={updateStatus} />
                    {!editMode && isOwner && <Button sx={{marginTop:2}} variant={"contained"} onClick={() => goToEditMode()}>
                         Edit
                    </Button>}
                </Stack>
            </Stack>
            {editMode
                ? <ProfileDataForm profile={profile} setEditMode={setEditMode} />
                : <ProfileData profile={profile} goToEditMode={goToEditMode} isOwner={isOwner} />}
        </ThemeBox>
    );
});