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

interface IContacts {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
}
interface IPhotos {
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
    status:string;
}