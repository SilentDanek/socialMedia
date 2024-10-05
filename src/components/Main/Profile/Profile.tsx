import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { Preloader } from "../../common";
import { FC, useEffect } from "react";
import { bindedThunks, getAuthUserId, getIsFetching, getUserProfile, useAppSelector } from "../../../redux";
import { useParams } from "react-router-dom";

export const Profile: FC = () => {
    const profile = useAppSelector(getUserProfile);
    const isFetching = useAppSelector(getIsFetching);
    const authUserId = useAppSelector(getAuthUserId);
    const { requestUserProfile, getStatus } = bindedThunks.profileThunks;

    const params = useParams();
    useEffect(() => {
        const userID = Number(params.userID);
        requestUserProfile(userID);
        getStatus(userID);
    }, [params.userID]);


    return !isFetching && profile ? (
        <ProfileInfo profile={profile} isOwner={params.userID === `${authUserId}`} />
    ) : (
        <Preloader />
    );
};

export default Profile;