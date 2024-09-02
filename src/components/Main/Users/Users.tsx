import { Paginator, Preloader } from "../../common";
import { User } from "./User/User";
import { FC, useCallback, useEffect } from "react";
import {
    bindedThunks,
    useAppSelector,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../../redux";

const Users: FC = () => {
    const users = useAppSelector(getUsers);
    const pageSize = useAppSelector(getPageSize);
    const isFetching = useAppSelector(getIsFetching);
    const currentPage = useAppSelector(getCurrentPage);
    const totalUsersCount = useAppSelector(getTotalUsersCount);
    const followingInProgress = useAppSelector(getFollowingInProgress);

    const { requestUsers, follow, unfollow } = bindedThunks.usersThunks;

    //Preload users when the users page opens
    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [requestUsers]);

    const handlePageChanged = useCallback(
        (pageNumber: number) => {
            requestUsers(pageNumber, pageSize);
        },
        [requestUsers]
    );

    return (
        <div>
            <Paginator
                currentPage={currentPage}
                handlePageChanged={handlePageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            {isFetching ? (
                <Preloader />
            ) : (
                users.map((user) => (
                    <User
                        key={user.id}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                        followingInProgress={followingInProgress}
                    />
                ))
            )}
        </div>
    );
};

export default Users;
