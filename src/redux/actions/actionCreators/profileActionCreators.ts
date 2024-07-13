import IAction from "../IAction";
import ProfileActionTypes from "../actionTypes/profileActionTypes";

export const updateNewPostText = (text:string): IAction => ({
    type: ProfileActionTypes.UPDATE_NEW_POST_TEXT,
    payload: { text }
});

export const addPost = (): IAction => ({
    type: ProfileActionTypes.ADD_POST,
    payload: { text:"" }
});
