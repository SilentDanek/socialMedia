import { ProfileInfo, ProfileInfoSkeleton } from "./ProfileInfo";
import { FC, useEffect } from "react";
import { boundThunks, getAuthUserId, getIsFetching, getUserProfile, useAppSelector } from "../../../redux";
import { useParams } from "react-router-dom";

export const Profile: FC = () => {
    const profile = useAppSelector(getUserProfile);
    const isFetching = useAppSelector(getIsFetching);
    const authUserId = useAppSelector(getAuthUserId);
    const { requestUserProfile, getStatus } = boundThunks.profileThunks;

    const params = useParams();
    useEffect(() => {
        const userID = Number(params.userID);
        requestUserProfile(userID);
        getStatus(userID);
    }, [params.userID]);


  return !isFetching && profile ? (
        <ProfileInfo profile={profile} isOwner={params.userID === `${authUserId}`} />
    ) : (
        <ProfileInfoSkeleton />
    );
};

export default Profile;