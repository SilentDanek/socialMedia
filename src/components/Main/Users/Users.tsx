import { Paginator } from '../../common';
import { UserCard, UserCardSkeleton } from './UserCard';
import { FC, useCallback } from 'react';
import {
    boundThunks,
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
    useAppSelector,
    UsersFilter
} from '../../../redux';
import { UsersSearchForm } from './NewSearchForm';
import { useUsersQueryParams } from '../../../hooks/useUsersQueryParams';
import { UsersSection, UsersWrapper } from './Users.styles';

const Users: FC = () => {
    const users = useAppSelector(getUsers);
    const pageSize = useAppSelector(getPageSize);
    const isFetching = useAppSelector(getIsFetching);
    const currentPage = useAppSelector(getCurrentPage);

    const totalUsersCount = useAppSelector(getTotalUsersCount);
    const filter = useAppSelector(getUsersFilter);

    const { requestUsers } = boundThunks.usersThunks;

    //Synchronization of query params and filters
    useUsersQueryParams(currentPage, filter, requestUsers, pageSize);

    const handlePageChanged = useCallback((pageNumber: number) => {
        if (pageNumber === currentPage) return;
        requestUsers(pageNumber, pageSize, filter);
    }, [pageSize, filter, currentPage]);

    const handleFilterChanged = useCallback((filter: UsersFilter) => {
        requestUsers(1, pageSize, filter);
    }, [pageSize]);

    return (
        <UsersWrapper>
            <UsersSection>
                <UsersSearchForm handleFilterChanged={handleFilterChanged} />
                {
                    isFetching
                        ? Array(pageSize).fill(0).map((_, index) => (
                            <UserCardSkeleton key={index} />
                        ))
                        : users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))
                }
                <Paginator
                    currentPage={currentPage}
                    handlePageChanged={handlePageChanged}
                    totalItemsCount={totalUsersCount}
                    itemsInPage={pageSize}
                    portionSize={7}
                    responsive={true}
                />
            </UsersSection>
        </UsersWrapper>
    );
};



export default Users;