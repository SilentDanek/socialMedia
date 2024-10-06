import { Paginator, Preloader } from "../../common";
import { User } from "./User/User";
import { FC, useCallback } from "react";
import {
    bindedThunks,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
    useAppSelector,
    UsersFilter
} from "../../../redux";
import { UsersSearchForm } from "./NewSearchForm/NewSearchForm";
import { useUsersQueryParams } from "../../../hooks/useUsersQueryParams";

const Users: FC = () => {
    const users = useAppSelector(getUsers);
    const pageSize = useAppSelector(getPageSize);
    const isFetching = useAppSelector(getIsFetching);
    const currentPage = useAppSelector(getCurrentPage);
    const totalUsersCount = useAppSelector(getTotalUsersCount);
    const followingInProgress = useAppSelector(getFollowingInProgress);
    const filter = useAppSelector(getUsersFilter);

    const { requestUsers, follow, unfollow } = bindedThunks.usersThunks;

    //Synchronization of query params and filters
    useUsersQueryParams(currentPage, filter, requestUsers, pageSize);

    const handlePageChanged = useCallback((pageNumber: number) => {
        if (pageNumber === currentPage) return;
        requestUsers(pageNumber, pageSize, filter);
    },[pageSize, filter, currentPage]);

    const handleFilterChanged = useCallback((filter: UsersFilter) => {
        requestUsers(1, pageSize, filter);
    },[pageSize]);

    return (
        <div>
            <Paginator
                currentPage={currentPage}
                handlePageChanged={handlePageChanged}
                totalItemsCount={totalUsersCount}
                itemsInPage={pageSize}
                portionSize={7}
                responsive={true}
            />
            <UsersSearchForm handleFilterChanged={handleFilterChanged} />
            {isFetching
                ? <Preloader />
                : users.length
                    ? users.map((user) => (<User
                        key={user.id}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                        followingInProgress={followingInProgress}
                    />))
                    : <img src="https://media.tenor.com/tVrkM5XhW-EAAAAM/flick-esfand.gif" alt="" />
            }
        </div>
    );
};

export default Users;