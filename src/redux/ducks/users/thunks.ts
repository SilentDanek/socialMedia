import {UsersAction} from "./types";
import {Dispatch} from "react";
import {ResultCodes, userAPI} from "../../../api/api";
import {ThunkAction} from "redux-thunk";
import {State} from "../../types";
import {usersActions} from "./actions";


type UsersThunk = ThunkAction<Promise<void>, State, unknown, UsersAction>;
const requestUsers = (currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null):UsersThunk => {
    return async (dispatch) => {
        dispatch(usersActions.toggleIsFetching(true));
        const response = await userAPI.getUsers(currentPage, pageSize, term, friend);
        dispatch(usersActions.toggleIsFetching(false));
        dispatch(usersActions.setUsers(response.items));
        dispatch(usersActions.setTotalUsersCount(response.totalCount));
        dispatch(usersActions.setCurrentPage(currentPage));
    }
};

type FollowUnfollowDispatch = Dispatch<UsersAction>
const _followUnfollowFlow = async (
                                    dispatch: FollowUnfollowDispatch,
                                    userId: number,
                                    method: typeof userAPI.follow,
                                    ActionCreator: typeof usersActions.followSuccess | typeof usersActions.unfollowSuccess):Promise<void> => {

    dispatch(usersActions.toggleFollowingInProgress(userId, true));
    const response = await method(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(ActionCreator(userId));
    }
    dispatch(usersActions.toggleFollowingInProgress(userId, false));
};

const follow = (userId: number):UsersThunk => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), usersActions.followSuccess);
    }
};
const unfollow = (userId: number):UsersThunk => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), usersActions.unfollowSuccess);
    }
};

export const usersThunks = {
    requestUsers,
    follow,
    unfollow
}