import {ProfileActionTypes} from "./actionTypes";
import {
    AddPostAction,
    DeletePostAction, Photos,
    SetNewPhotosAction,
    SetStatusAction,
    SetUserProfileAction,
    UserProfile
} from "./types";


export const addPost = (text: string): AddPostAction => ({
    type: ProfileActionTypes.ADD_POST,
    payload: {text}
});

export const deletePost = (id: number): DeletePostAction => ({
    type: ProfileActionTypes.DELETE_POST,
    payload: {id}
});

export const setUserProfile = (profile: UserProfile): SetUserProfileAction => ({
    type: ProfileActionTypes.SET_USER_PROFILE,
    payload: {profile}
});

export const setStatus = (status: string): SetStatusAction => ({
    type: ProfileActionTypes.SET_STATUS,
    payload: {status}
});

export const setNewPhotos = (photos: Photos): SetNewPhotosAction => ({
    type: ProfileActionTypes.SET_NEW_PHOTO,
    payload: {photos}
});