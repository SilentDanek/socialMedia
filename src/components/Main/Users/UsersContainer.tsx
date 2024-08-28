import {Users} from "./Users";
import {useCallback, useEffect} from "react";
import {follow, unfollow, requestUsers} from "../../../redux/ducks/users/thunks";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../redux/ducks/users/selectors";
import {useAppSelector} from "../../../redux/store";
import {useActions} from "../../../hooks/useActions";


// Optimized
const UsersContainer = () => {
    const users = useAppSelector(getUsers);
    const pageSize = useAppSelector(getPageSize);
    const isFetching = useAppSelector(getIsFetching);
    const currentPage = useAppSelector(getCurrentPage);
    const totalUsersCount = useAppSelector(getTotalUsersCount);
    const followingInProgress = useAppSelector(getFollowingInProgress);

    const [followD, unfollowD, requestUsersD] = useActions([follow, unfollow,  requestUsers]);

    //Preload users when the users page opens
    useEffect(() => {
        requestUsersD(currentPage, pageSize);
    }, [requestUsersD]);

    const onPageChanged = useCallback((pageNumber: number) => {
        requestUsersD(pageNumber, pageSize);
    }, [requestUsersD]);

    return (
            <Users
                isFetching={isFetching}
                users={users}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                followingInProgress={followingInProgress}
                follow={followD}
                unfollow={unfollowD}
            />
    );
}

export default UsersContainer;