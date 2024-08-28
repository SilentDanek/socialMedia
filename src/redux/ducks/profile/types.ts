import {ProfileActionTypes} from "./actionTypes";

export type User = {
    avatarURL: string;
    nickName: string;
};
export type TPost = {
    id: number;
    user: User;
    likes: number;
    dislikes: number;
    message: string;
};
export type Contacts = {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
};
export type Photos = {
    small: string | null;
    large: string | null;
};
export type UserProfile = {
    aboutMe: string;
    contacts: Contacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: Photos;
};
export type ProfileState = {
    profile: UserProfile | null;
    posts: TPost[];
    status: string;
};

export type AddPostAction = {
    type: ProfileActionTypes.ADD_POST,
    payload: {text:string}
};
export type DeletePostAction = {
    type: ProfileActionTypes.DELETE_POST,
    payload: {id:number}
};
export type SetUserProfileAction = {
    type: ProfileActionTypes.SET_USER_PROFILE,
    payload: {profile: UserProfile}
};
export type SetStatusAction = {
    type: ProfileActionTypes.SET_STATUS,
    payload: {status:string}
};
export type SetNewPhotosAction = {
    type: ProfileActionTypes.SET_NEW_PHOTO,
    payload: {photos:Photos}
};
export type ProfileAction = AddPostAction | DeletePostAction | SetUserProfileAction | SetStatusAction |SetNewPhotosAction;