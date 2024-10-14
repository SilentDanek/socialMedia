import { UsersActionTypes } from './actionTypes';
import { TUser, UsersFilter } from './types';

export const usersActions = {
    followSuccess: (id: number) =>
        ({
            type: UsersActionTypes.FOLLOW,
            payload: { id }
        }) as const,
    unfollowSuccess: (id: number) =>
        ({
            type: UsersActionTypes.UNFOLLOW,
            payload: { id }
        }) as const,
    setUsers: (users: TUser[]) =>
        ({
            type: UsersActionTypes.SET_USERS,
            payload: { users }
        }) as const,
    setCurrentPage: (currentPage: number) =>
        ({
            type: UsersActionTypes.SET_CURRENT_PAGE,
            payload: { currentPage }
        }) as const,
    setTotalUsersCount: (totalUsersCount: number) =>
        ({
            type: UsersActionTypes.SET_TOTAL_USERS_COUNT,
            payload: { totalUsersCount }
        }) as const,
    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: UsersActionTypes.TOGGLE_IS_FETCHING,
            payload: { isFetching }
        }) as const,
    toggleFollowingInProgress: (id: number, isFetching: boolean) =>
        ({
            type: UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS,
            payload: { id, isFetching }
        }) as const,
    setFilter: (filter: UsersFilter) =>
        ({
            type: UsersActionTypes.SET_FILTER,
            payload: filter
        }) as const
};
