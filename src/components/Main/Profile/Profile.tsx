import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { Preloader } from "../../common";
import { FC, useEffect } from "react";
import { bindedThunks, getAuthUserId, getIsFetching, getUserProfile, useAppSelector } from "../../../redux";
import { useNavigate, useParams } from "react-router-dom";

export const Profile: FC = () => {
    const profile = useAppSelector(getUserProfile);
    const isFetching = useAppSelector(getIsFetching);
    const authUserId = useAppSelector(getAuthUserId);
    const { requestUserProfile, getStatus } = bindedThunks.profileThunks;

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const userID = Number(params.userID);
        if (!userID) {
            navigate("/login");
            return;
        }
        requestUserProfile(userID);
        getStatus(userID);
    }, [params.userID]);

    console.log("Profile" + Boolean(profile));

    return !isFetching && profile ? (
        <ProfileInfo profile={profile} isOwner={params.userID === `${authUserId}`} />
    ) : (
        <Preloader />
    );
};

export default Profile;