import {Photos, UserProfile} from "../redux/ducks/profile/types";
import {DefaultResponse, instance} from "./api";


type GetStatusResponse = string;
type GetUserProfileResponse = DefaultResponse & UserProfile;
type UpdateUserProfileResponse = DefaultResponse & UserProfile;
type UpdatePhotoResponse = DefaultResponse & { data: { photos: Photos } };
export const profileAPI = {
    getStatus(userID: number) {
        return instance.get<GetStatusResponse>(`profile/status/${userID}`).then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<DefaultResponse>("profile/status", {status}).then(response => response.data);
    },
    getUserProfile(userID: number) {
        return instance.get<GetUserProfileResponse>(`profile/${userID}`).then(response => response.data);
    },
    updateUserProfile(newProfile: UserProfile) {
        return instance.put<UpdateUserProfileResponse>("profile", newProfile).then(response => response.data);
    },
    updatePhoto(file: FormData) {
        return instance.put<UpdatePhotoResponse>("profile/photo", file, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(response => response.data);
    },
}