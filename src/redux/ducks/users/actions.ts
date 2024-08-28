import {UsersActionTypes} from "./actionTypes";
import {
    TUser,
    FollowSuccessAction,
    SetCurrentPageAction,
    SetTotalUsersCountAction,
    SetUsersAction, ToggleFollowingInProgressAction, ToggleIsFetchingAction,
    UnfollowSuccessAction
} from "./types";

export const followSuccess = (id: number): FollowSuccessAction => ({
    type: UsersActionTypes.FOLLOW,
    payload: {id}
});
export const unfollowSuccess = (id: number): UnfollowSuccessAction => ({
    type: UsersActionTypes.UNFOLLOW,
    payload: {id}
});
export const setUsers = (users: TUser[]): SetUsersAction => ({
    type: UsersActionTypes.SET_USERS,
    payload: {users}
});
export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({
    type: UsersActionTypes.SET_CURRENT_PAGE,
    payload: {currentPage}
});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAction => ({
    type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
    payload: {totalUsersCount}
});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({
    type: UsersActionTypes.TOGGLE_IS_FETCHING,
    payload: {isFetching}
});
export const toggleFollowingInProgress = (id: number, isFetching: boolean): ToggleFollowingInProgressAction => ({
    type: UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    payload: {id, isFetching}
});

