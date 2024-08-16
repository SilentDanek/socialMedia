import {IAction} from "../../interfaces/IAction";
import {userAPI} from "../../api/api";
import {Dispatch} from "react";
import {updateItemsByCondition} from "../../utils/ultimates";

enum UsersActionTypes {
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT",
    TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
    TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS"
}

export interface IUser {
    id: number;
    name: string;
    uniqueUrlName: null;
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null;
    followed: boolean;
}
export interface IUsersPage {
    users: IUser[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: number[]
}
const initialState: IUsersPage = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export function usersReducer(state = initialState, action: IAction): IUsersPage {
    switch (action.type) {
        case UsersActionTypes.FOLLOW: {
            return {
                ...state,
                // @ts-ignore
                users: updateItemsByCondition(state.users, `id`, +action.payload.id, {followed: true})
            };
        }
        case UsersActionTypes.UNFOLLOW: {
            return {
                ...state,
                // @ts-ignore
                users: updateItemsByCondition(state.users, `id`, +action.payload.id, {followed: false})
            };
        }
        case UsersActionTypes.SET_USERS: {
            // @ts-ignore
            return {...state, users: action.payload.users}
        }
        case UsersActionTypes.SET_CURRENT_PAGE: {
            // @ts-ignore
            return {...state, currentPage: action.payload.currentPage}
        }
        case UsersActionTypes.SET_TOTAL_USERS_COUNT: {
            // @ts-ignore
            return {...state, totalUsersCount: action.payload.totalUsersCount}
        }
        case UsersActionTypes.TOGGLE_IS_FETCHING: {
            // @ts-ignore
            return {...state, isFetching: action.payload.isFetching}
        }
        case UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                // @ts-ignore
                followingInProgress: action.payload.isFetching ?
                    // @ts-ignore
                    state.followingInProgress.concat(action.payload.id) :
                    // @ts-ignore
                    state.followingInProgress.filter((userId) => userId !== action.payload.id)
            }
        }
        default: {
            return state;
        }
    }
}

export const followAC = (id: number): IAction => ({
    type: UsersActionTypes.FOLLOW,
    // @ts-ignore
    payload: {id}
});
export const unfollowAC = (id: number): IAction => ({
    type: UsersActionTypes.UNFOLLOW,
    // @ts-ignore
    payload: {id}
});
export const setUsers = (users: IUser[]): IAction => ({
    type: UsersActionTypes.SET_USERS,
    // @ts-ignore
    payload: {users}
});
export const setCurrentPage = (currentPage: number): IAction => ({
    type: UsersActionTypes.SET_CURRENT_PAGE,
    // @ts-ignore
    payload: {currentPage}
});
export const setTotalUsersCount = (totalUsersCount: number): IAction => ({
    type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
    // @ts-ignore
    payload: {totalUsersCount}
});
export const toggleIsFetching = (isFetching: boolean): IAction => ({
    type: UsersActionTypes.TOGGLE_IS_FETCHING,
    // @ts-ignore
    payload: {isFetching}
});
export const toggleFollowingInProgress = (id: number, isFetching: boolean): IAction => ({
    type: UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    // @ts-ignore
    payload: {id, isFetching}
});

export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(toggleIsFetching(true));
        const response = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
}

const followUnfollowFlow = async (
    dispatch: Dispatch<any>,
    userId: number,
    method: (userId: number) => Promise<any>,
    ActionCreator: (userId: number) => IAction) => {

    dispatch(toggleFollowingInProgress(userId, true));
    const response = await method(userId)
    if (response.resultCode === 0) {
        dispatch(ActionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(userId, false));
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followAC);
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowAC);
    }
}