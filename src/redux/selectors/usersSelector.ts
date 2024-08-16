import {IState} from "../store";

export const getUsers = (state:IState) => {
    return  state.usersPage.users;
};
export const getPageSize = (state:IState) => {
    return  state.usersPage.pageSize;
};
export const getCurrentPage = (state:IState) => {
    return  state.usersPage.currentPage;
};
export const getTotalUsersCount = (state:IState) => {
    return  state.usersPage.totalUsersCount;
};
export const getIsFetching = (state:IState) => {
    return  state.usersPage.isFetching;
};
export const getFollowingInProgress = (state:IState) => {
    return  state.usersPage.followingInProgress;
};