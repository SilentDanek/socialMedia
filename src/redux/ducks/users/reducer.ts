import { updateItemsByCondition } from "../../../utils";
import { UsersActionTypes } from "./actionTypes";
import { UsersAction, UsersState } from "./types";


const initialState: UsersState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
}



export function usersReducer(state = initialState, action: UsersAction): UsersState {
    switch (action.type) {
        case UsersActionTypes.FOLLOW: {
            return {
                ...state,
                users: updateItemsByCondition(state.users, "id", +action.payload.id, {followed: true})
            };
        }
        case UsersActionTypes.UNFOLLOW: {
            return {
                ...state,
                users: updateItemsByCondition(state.users, "id", +action.payload.id, {followed: false})
            };
        }
        case UsersActionTypes.SET_USERS: {
            return {...state, users: action.payload.users};
        }
        case UsersActionTypes.SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload.currentPage};
        }
        case UsersActionTypes.SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.payload.totalUsersCount};
        }
        case UsersActionTypes.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload.isFetching};
        }
        case UsersActionTypes.TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.payload.isFetching ?
                    state.followingInProgress.concat(action.payload.id) :
                    state.followingInProgress.filter((userId) => userId !== action.payload.id)
            };
        }
        case UsersActionTypes.SET_FILTER: {
            return {...state, filter: action.payload}
        }
        default: {
            return state;
        }
    }
}

