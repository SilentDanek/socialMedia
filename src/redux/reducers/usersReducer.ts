import {IAction} from "../../interfaces/IAction";
import {IUser, IUsersPage} from "../../interfaces/IUsersPage";
import {UsersActionTypes} from "../actions/actionTypes/usersActionTypes";
import {userAPI} from "../../api/api";
import {Dispatch} from "react";

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
                users: state.users.map(
                    (user) => {
                        // @ts-ignore
                        if (user.id === +action.payload.id) {
                            return {...user, followed: true};
                        }
                        return user;
                    })
            };
        }
        case UsersActionTypes.UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(
                    (user) => {
                        // @ts-ignore
                        if (user.id === +action.payload.id) {
                            return {...user, followed: false};
                        }
                        return user;
                    })
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

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(toggleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize)
            .then((response) => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(response.items));
                dispatch(setTotalUsersCount(response.totalCount));
                dispatch(setCurrentPage(currentPage));
            });
    }
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(toggleFollowingInProgress(userId, true));
        userAPI.follow(userId)
            .then((response) => {
                if (response.resultCode === 0) {
                    dispatch(followAC(userId));
                }
                dispatch(toggleFollowingInProgress(userId, false));
            })
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(toggleFollowingInProgress(userId, true));
        userAPI.unfollow(userId)
            .then((response) => {
                if (response.resultCode === 0) {
                    dispatch(unfollowAC(userId));
                }
                dispatch(toggleFollowingInProgress(userId, false));
            })
    }
}