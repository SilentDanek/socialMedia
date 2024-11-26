import unknownUserSVG from '@/assets/images/unknown-user.svg';
import { FC, useEffect, useState } from 'react';
import { ProfileDataForm } from './ProfileDataForm';
import { ProfileData } from './ProfileData';
import { ProfileStatus } from './ProfileStatus';
import { AvatarLoader } from './AvatarLoader';
import {
    boundActions,
    boundThunks,
    getIsFollowed,
    getUserStatus,
    useAppSelector,
    UserProfile
} from '@/redux';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProfileContainer } from './ProfileInfo.style.tsx';
import { FollowButton, MessageButton } from '../../../common';
import { ProfileInfoMeta } from './ProfileInfo.meta.tsx';

type ProfileInfoProps = {
    profile: UserProfile;
    isOwner: boolean;
};
export const ProfileInfo: FC<ProfileInfoProps> = ({ profile, isOwner }) => {
    const [editMode, setEditMode] = useState(false);
    const status = useAppSelector(getUserStatus);
    const isFollowed = useAppSelector(getIsFollowed);
    const { t } = useTranslation('profile');

    const { checkIsFollow, updateStatus } = boundThunks.profileThunks;
    useEffect(() => {
        if (!isOwner) {
            checkIsFollow(profile.userId);
        }
    }, []);
    const { setIsFollowed } = boundActions.profileActions;

    const handleFollowStatusChange = () => setIsFollowed(!isFollowed);

    const AvatarComponent = (
        <Avatar src={profile.photos.large || unknownUserSVG} sx={{ width: 120, height: 120 }} />
    );

    return (
        <>
            <ProfileInfoMeta profile={profile} />

            <ProfileContainer>
                <Stack direction="row" alignItems="center" gap="4%">
                    <Box>
                        {isOwner ? <AvatarLoader>{AvatarComponent}</AvatarLoader> : AvatarComponent}
                    </Box>
                    <Stack>
                        <Typography variant="h5">{profile.fullName}</Typography>
                        <ProfileStatus status={status} updateStatus={updateStatus} />

                        {!editMode && isOwner && (
                            <Button
                                sx={{ marginTop: 2 }}
                                variant="contained"
                                onClick={() => setEditMode(true)}
                            >
                                {t('edit profile')}
                            </Button>
                        )}

                        {!isOwner && (
                            <Stack sx={{ marginTop: 2 }} direction="row" flexWrap="wrap">
                                <MessageButton userId={profile.userId} />
                                <FollowButton
                                    onClick={handleFollowStatusChange}
                                    userId={profile.userId}
                                    isFollow={isFollowed}
                                />
                            </Stack>
                        )}
                    </Stack>
                </Stack>
                {editMode ? (
                    <ProfileDataForm profile={profile} setEditMode={setEditMode} />
                ) : (
                    <ProfileData profile={profile} />
                )}
            </ProfileContainer>
        </>
    );
};
