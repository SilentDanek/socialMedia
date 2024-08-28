import {UsersActionTypes} from "./actionTypes";

export type TUser = {
    id: number;
    name: string;
    uniqueUrlName: null;
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null;
    followed: boolean;
};
export type UsersState = {
    users: TUser[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: number[]
};

export type FollowSuccessAction = {
    type: UsersActionTypes.FOLLOW,
    payload: { id: number }
};
export type UnfollowSuccessAction = {
    type: UsersActionTypes.UNFOLLOW,
    payload: { id: number }
};
export type SetUsersAction = {
    type: UsersActionTypes.SET_USERS,
    payload: { users: TUser[] }
};
export type SetCurrentPageAction = {
    type: UsersActionTypes.SET_CURRENT_PAGE,
    payload: { currentPage: number }
};
export type SetTotalUsersCountAction = {
    type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
    payload: { totalUsersCount: number }
};
export type ToggleIsFetchingAction = {
    type: UsersActionTypes.TOGGLE_IS_FETCHING,
    payload: { isFetching: boolean }
};
export type ToggleFollowingInProgressAction = {
    type: UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    payload: { id: number, isFetching: boolean }
};
export type UsersAction = FollowSuccessAction
    | UnfollowSuccessAction
    | SetUsersAction
    | SetCurrentPageAction
    | SetTotalUsersCountAction
    | ToggleIsFetchingAction
    | ToggleFollowingInProgressAction;