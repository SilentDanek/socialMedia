import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg";
import { FC, useState } from "react";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";
import { ProfileData } from "./ProfileData/ProfileData";
import { bindedThunks, getUserStatus, useAppSelector, UserProfile } from "../../../../redux";
import { AvatarLoader } from "./AvatarLoader/AvatarLoader";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { ThemeBox } from "../../../common";
import { useTranslation } from "react-i18next";


type ProfileInfoProps = {
    profile: UserProfile;
    isOwner: boolean;
}
export const ProfileInfo: FC<ProfileInfoProps> = ({ profile, isOwner }) => {
    const [editMode, setEditMode] = useState(false);
    const status = useAppSelector(getUserStatus);
    const {t} = useTranslation("profile");

    const { updateStatus } = bindedThunks.profileThunks;

    const avatar = <Avatar src={profile.photos.large || unknownUserSVG} sx={{ width: 120, height: 120 } } />;

    return (
        <ThemeBox
            sx={{
                margin: {
                    xs: 0,
                    sm: 0,
                    md: "2px 15% 0 17%",
                    ld: "2px 20% 0 25%",
                },
                padding: "2%",
                maxWidth: "100%",
            }}
        >
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
                    {!editMode && isOwner && <Button sx={{marginTop:2}} variant={"contained"} onClick={() => setEditMode(true)}>
                        {t("edit profile")}
                    </Button>}
                </Stack>
            </Stack>
            {editMode
                ? <ProfileDataForm profile={profile} setEditMode={setEditMode} />
                : <ProfileData profile={profile}/>}
        </ThemeBox>
    );
};