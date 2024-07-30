import {IAction} from "../../../interfaces/IAction";
import {ProfileActionTypes} from "../actionTypes/profileActionTypes";
import {IUserProfile} from "../../../interfaces/IProfilePage";

export const updateNewPostText = (newPostText:string): IAction => ({
    type: ProfileActionTypes.UPDATE_NEW_POST_TEXT,
    // @ts-ignore
    payload: { newPostText }
});

export const addPost = (): IAction => ({
    type: ProfileActionTypes.ADD_POST,
    payload: { text:"" }
});

export const setUserProfile = (profile:IUserProfile): IAction => ({
    type: ProfileActionTypes.SET_USER_PROFILE,
    // @ts-ignore
    payload: { profile }
});
