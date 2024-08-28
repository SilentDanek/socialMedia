import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Profile} from "./Profile";
import {
    getStatus,
    requestUserProfile,
    updatePhoto,
    updateStatus,
    updateUserProfile
} from "../../../redux/ducks/profile/thunks";
import {getAuthUserId} from "../../../redux/ducks/auth/selectors";
import {getUserProfile, getUserStatus} from "../../../redux/ducks/profile/selectors";
import {useAppSelector} from "../../../redux/store";
import {useActions} from "../../../hooks/useActions";
import {getIsFetching} from "../../../redux/ducks/users/selectors";

const ProfileContainer = () => {
    const profile = useAppSelector(getUserProfile);
    const isFetching = useAppSelector(getIsFetching);
    const status  = useAppSelector(getUserStatus);
    const authUserId = useAppSelector(getAuthUserId);

    const [requestUserProfileD, getStatusD,
        updateStatusD, updatePhotoD,
        updateUserProfileD] = useActions([requestUserProfile, getStatus, updateStatus, updatePhoto, updateUserProfile]);

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(!Number(params.userID)){
            navigate('/login');
            return;
        }
        const userId = Number(params.userID);
        requestUserProfileD(userId);
        getStatusD(userId);
    },[params.userID]);

    return <Profile isFetching={isFetching}
                    profile={profile}
                    status={status}
                    updateStatus={updateStatusD}
                    updatePhoto={updatePhotoD}
                    updateUserProfile={updateUserProfileD}
                    isOwner={params.userID ===`${authUserId}`}
    />;
}

export default ProfileContainer;