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
    type: UsersActionTypes.SET_USERS,
    // @ts-ignore
    payload: { users }
});

export const setCurrentPageAC = (currentPage:number): IAction => ({
    type: UsersActionTypes.SET_CURRENT_PAGE,
    // @ts-ignore
    payload: { currentPage }
});

export const setTotalUsersCountAC = (totalUsersCount:number): IAction => ({
    type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
    // @ts-ignore
    payload: { totalUsersCount }
});