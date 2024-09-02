import {State} from "../../types";

export const getUsers = (state:State) => state.usersPage.users;

export const getPageSize = (state:State) => state.usersPage.pageSize;

export const getCurrentPage = (state:State) => state.usersPage.currentPage;

export const getTotalUsersCount = (state:State) => state.usersPage.totalUsersCount;

export const getIsFetching = (state:State) => state.usersPage.isFetching;

export const getFollowingInProgress = (state:State) => state.usersPage.followingInProgress;