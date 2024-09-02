import s from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { Preloader } from "../../common";
import { FC, useEffect } from "react";
import {
    getUserProfile,
    getIsFetching,
    getAuthUserId,
    bindedThunks,
    useAppSelector,
} from "../../../redux";
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

    return !isFetching && profile ? (
        <div className={s.profileWrapper}>
            <ProfileInfo
                profile={profile}
                isOwner={params.userID === `${authUserId}`}
            />
            <MyPosts />
        </div>
    ) : (
        <Preloader />
    );
};

export default Profile;
