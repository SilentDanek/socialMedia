import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Preloader} from "../../common/Preloader/Preloader";
import {UserProfile} from "../../../redux/ducks/profile/types";
import {FC} from "react";

type ProfileProps = {
    isFetching: boolean;
    profile: UserProfile | null;
    status: string;
    updateStatus: () => void;
    updatePhoto: () => void;
    updateUserProfile: (formData:any) => Promise<void>;
    isOwner: boolean;
}

export const Profile: FC<ProfileProps> = (props) => {
    return (
        !props.isFetching && props.profile
            ? <div className={s.profileWrapper}>
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             updateStatus={props.updateStatus}
                             updatePhoto={props.updatePhoto}
                             updateUserProfile={props.updateUserProfile}
                             isOwner={props.isOwner}
                />
                <MyPostsContainer/>
              </div>
            : <Preloader/>
    );
};