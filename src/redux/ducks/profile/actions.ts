import {ProfileActionTypes} from "./actionTypes";
import {Photos, UserProfile} from "./types";


export const profileActions = {
    addPost: (text: string) => ({
        type: ProfileActionTypes.ADD_POST,
        payload: {text}
    } as const),
    deletePost: (id: number) => ({
        type: ProfileActionTypes.DELETE_POST,
        payload: {id}
    } as const),
    setUserProfile: (profile: UserProfile) => ({
        type: ProfileActionTypes.SET_USER_PROFILE,
        payload: {profile}
    } as const),
    setStatus: (status: string) => ({
        type: ProfileActionTypes.SET_STATUS,
        payload: {status}
    } as const),
    setNewPhotos: (photos: Photos) => ({
        type: ProfileActionTypes.SET_NEW_PHOTO,
        payload: {photos}
    } as const)
}