import {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingInProgress,
    toggleIsFetching, unfollowSuccess
} from "./actions";
import {FollowSuccessAction, ToggleFollowingInProgressAction, UnfollowSuccessAction, UsersAction} from "./types";
import {Dispatch} from "react";
import {ResultCodes, userAPI} from "../../../api/api";
import {ThunkAction} from "redux-thunk";
import {State} from "../../store";


type UsersThunk = ThunkAction<Promise<void>, State, unknown, UsersAction>;
export const requestUsers = (currentPage: number, pageSize: number):UsersThunk => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const response = await userAPI.getUsers(currentPage, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
};

type FollowUnfollowDispatch = Dispatch<ToggleFollowingInProgressAction | FollowSuccessAction | UnfollowSuccessAction>
const _followUnfollowFlow = async (
                                    dispatch: FollowUnfollowDispatch,
                                    userId: number,
                                    method: typeof userAPI.follow,
                                    ActionCreator: (userId: number) => FollowSuccessAction | UnfollowSuccessAction):Promise<void> => {

    dispatch(toggleFollowingInProgress(userId, true));
    const response = await method(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(ActionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(userId, false));
};


export const follow = (userId: number) => {
    return (dispatch:FollowUnfollowDispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    }
};
export const unfollow = (userId: number) => {
    return (dispatch: FollowUnfollowDispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
};