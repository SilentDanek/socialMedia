import {IAction} from "../../../interfaces/IAction";
import {UsersActionTypes} from "../actionTypes/usersActionTypes";
import {IUser} from "../../../interfaces/IUsersPage";

export const follow = (id:number): IAction => ({
    type: UsersActionTypes.FOLLOW,
    // @ts-ignore
    payload: { id }
});

export const unfollow = (id:number): IAction => ({
    type: UsersActionTypes.UNFOLLOW,
    // @ts-ignore
    payload: { id }
});

export const setUsers = (users:IUser[]): IAction => ({
    type: UsersActionTypes.SET_USERS,
    // @ts-ignore
    payload: { users }
});

export const setCurrentPage = (currentPage:number): IAction => ({
    type: UsersActionTypes.SET_CURRENT_PAGE,
    // @ts-ignore
    payload: { currentPage }
});

export const setTotalUsersCount = (totalUsersCount:number): IAction => ({
    type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
    // @ts-ignore
    payload: { totalUsersCount }
});

export const toggleIsFetching = (isFetching:boolean): IAction => ({
    type: UsersActionTypes.TOGGLE_IS_FETCHING,
    // @ts-ignore
    payload: { isFetching }
});