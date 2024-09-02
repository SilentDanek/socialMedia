import {InferActionsTypes} from "../../types";
import {usersActions} from "./actions";


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


export type UsersAction = InferActionsTypes<typeof usersActions>;