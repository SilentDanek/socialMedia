import IAction from "../IAction";
import UsersActionTypes from "../actionTypes/usersActionTypes";
import {IUser} from "../../../interfaces/IUsersPage";

export const followAC = (id:number): IAction => ({
    type: UsersActionTypes.FOLLOW,
    // @ts-ignore
    payload: { id }
});

export const unfollowAC = (id:number): IAction => ({
    type: UsersActionTypes.UNFOLLOW,
    // @ts-ignore
    payload: { id }
});

export const setUsersAC = (users:IUser[]): IAction => ({
    type: UsersActionTypes.UNFOLLOW,
    // @ts-ignore
    payload: { users }
});