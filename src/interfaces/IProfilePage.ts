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

export interface IProfileInfo {
    avatarURL: string;
    wallpaperURL: string;
    nickName: string;
}

export interface IProfilePage {
    profileInfo: IProfileInfo;
    posts: IPost[];
    newPostText: string;
}
