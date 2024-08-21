import {IAction} from "../../interfaces/IAction";
import {Dispatch} from "react";
import {profileAPI} from "../../api/api";
import {toggleIsFetching} from "./usersReducer";
import {IState} from "../store";
import {stopSubmit} from "redux-form";

export enum ProfileActionTypes {
    ADD_POST = "ADD_POST",
    DELETE_POST = "DELETE_POST",
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_STATUS = "SET_STATUS",
    SET_NEW_PHOTO = "SET_NEW_PHOTO"
}

export interface IUser {
    avatarURL: string;
    nickName: string;
}

export interface IPost {
    id: number;
    user: IUser;
    likes: number;
    dislikes: number;
    message: string;
}

export interface IContacts {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
}

export interface IPhotos {
    small: string | null;
    large: string | null;
}

export interface IUserProfile {
    aboutMe: string;
    contacts: IContacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: IPhotos;
}

export interface IProfilePage {
    profile: IUserProfile | null;
    posts: IPost[];
    status: string;
}

let initialState: IProfilePage = {
    profile: null,
    status: "",
    posts: [
        {
            id: 1,
            user: {
                avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                nickName: "Billy Harrington"
            },
            likes: 3,
            dislikes: 0,
            message: "Is it you legend?"
        },
        {
            id: 2,
            user: {
                avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                nickName: "Van Darkholm"
            },
            likes: 12,
            dislikes: 0,
            message: "Your flex is amazing!"
        }],
};

export function profileReducer(state = initialState, action: IAction): IProfilePage {

    switch (action.type) {
        case ProfileActionTypes.ADD_POST: {
            // Test
            const newPost = {
                user: {
                    avatarURL: "https://steamuserimages-a.akamaihd.net/ugc/1736675605280339028/3E984442933B76839E2E6F719C780B554603DB14/",
                    nickName: "Anon"
                },
                id: 5,
                //@ts-ignore
                message: action.payload.text,
                likes: 0,
                dislikes: 0
            }

            return {
                ...state,
                posts: state.posts.concat(newPost),
            };
        }
        case ProfileActionTypes.DELETE_POST: {
            return {
                ...state,
                //@ts-ignore
                posts: state.posts.filter(post => post.id !== action.payload.id),
            };
        }
        case ProfileActionTypes.SET_USER_PROFILE: {
            return {
                ...state,
                // @ts-ignore
                profile: action.payload.profile
            };
        }
        case ProfileActionTypes.SET_STATUS: {
            return {
                ...state,
                // @ts-ignore
                status: action.payload.status
            };
        }
        case ProfileActionTypes.SET_NEW_PHOTO: {
            return {
                ...state,
                // @ts-ignore
                profile: {...state.profile, photos: action.payload.photos}
            };
        }
        default: {
            return state;
        }
    }
}

export const addPost = (text: string): IAction => ({
    type: ProfileActionTypes.ADD_POST,
    payload: {text}
});

export const deletePost = (id: number): IAction => ({
    type: ProfileActionTypes.DELETE_POST,
    payload: {id}
});

export const setUserProfile = (profile: IUserProfile): IAction => ({
    type: ProfileActionTypes.SET_USER_PROFILE,
    // @ts-ignore
    payload: {profile}
});

export const setStatus = (status: string): IAction => ({
    type: ProfileActionTypes.SET_STATUS,
    // @ts-ignore
    payload: {status}
});

export const setNewPhotos = (photos: string): IAction => ({
    type: ProfileActionTypes.SET_NEW_PHOTO,
    // @ts-ignore
    payload: {photos}
});

export const getStatus = (userId: number) => {
    return async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response));
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const requestUserProfile = (userId: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(toggleIsFetching(true));

        const response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfile(response));
        dispatch(toggleIsFetching(false));
    }
}

export const updatePhoto = (photo: FormData) => {
    return async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.updatePhoto(photo);
        if (response.resultCode === 0) {
            dispatch(setNewPhotos(response.data.photos));
        }
    }
}

export const updateUserProfile = (newProfile: IUserProfile) => {
    return async (dispatch: Dispatch<any>, getState: () => IState) => {
        const response = await profileAPI.updateUserProfile(newProfile);
        const userId = getState().auth.id;

        if (response.resultCode === 0 && userId) {
            dispatch(requestUserProfile(userId));
            return;
        }

        const errorMessage: string = response.messages.length
            ? response.messages[0]
            : "Some error";
        let badField;
        if (errorMessage.includes("Contacts")) {
            const match = errorMessage.match(/(\w+)->(\w+)/);
            if (match) {
                badField = {
                    [match[1].toLowerCase()]: {
                        [match[2].toLowerCase()]: errorMessage
                    }
                };
            }
        } else {
            badField = {_error: errorMessage};
        }

        const action = stopSubmit("editProfile", badField);
        dispatch(action);

        return Promise.reject(errorMessage);
    }
}