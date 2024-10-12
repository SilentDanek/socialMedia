import {profileActions} from "./actions";
import {InferActionsTypes} from "../../types";

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
    status: string;
};

export type ProfileAction = InferActionsTypes<typeof profileActions>;