import {IAction} from "../../interfaces/IAction";
import {addPost, deletePost, profileReducer} from "./profileReducer";

interface IUser {
    avatarURL: string;
    nickName: string;
}
interface IPost {
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
interface IUserProfile {
    aboutMe: string;
    contacts: IContacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: IPhotos;
}
interface IProfilePage {
    profile: IUserProfile | null;
    posts: IPost[];
    status:string;
}
let initialState:IProfilePage = {
    profile: null,
    status:"",
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

test("after deleting a post, the number of posts should decrement", () => {

    const action = addPost("some text");

    const newState = profileReducer(initialState, action);

    expect(newState.posts.length).toEqual(initialState.posts.length + 1)
})


test("after deleting a post, the number of posts should decrement", () => {

    const action = deletePost(2);

    const newState = profileReducer(initialState, action);

    expect(newState.posts.length).toEqual(initialState.posts.length - 1)
})


export {}
