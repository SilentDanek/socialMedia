import { usersReducer } from './reducer';
import { usersActions } from './actions';
import { UsersState, TUser, UsersFilter } from './types';

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
};

describe('usersReducer tests', () => {
    const mockUser: TUser = {
        id: 1,
        name: 'John Doe',
        uniqueUrlName: null,
        photos: { small: null, large: null },
        status: 'Active',
        followed: false
    };

    test('should follow a user', () => {
        const action = usersActions.followSuccess(1);
        const newState = usersReducer({ ...initialState, users: [mockUser] }, action);

        expect(newState.users[0].followed).toBe(true);
    });

    test('should unfollow a user', () => {
        const followedUser: TUser = { ...mockUser, followed: true };
        const action = usersActions.unfollowSuccess(1);
        const newState = usersReducer({ ...initialState, users: [followedUser] }, action);

        expect(newState.users[0].followed).toBe(false);
    });

    test('should set users', () => {
        const newUsers: TUser[] = [
            { ...mockUser, id: 1 },
            { ...mockUser, id: 2, name: 'Jane Doe' }
        ];
        const action = usersActions.setUsers(newUsers);
        const newState = usersReducer(initialState, action);

        expect(newState.users.length).toBe(2);
        expect(newState.users[0].name).toBe('John Doe');
        expect(newState.users[1].name).toBe('Jane Doe');
    });

    test('should set current page', () => {
        const action = usersActions.setCurrentPage(5);
        const newState = usersReducer(initialState, action);

        expect(newState.currentPage).toBe(5);
    });

    test('should set total users count', () => {
        const action = usersActions.setTotalUsersCount(100);
        const newState = usersReducer(initialState, action);

        expect(newState.totalUsersCount).toBe(100);
    });

    test('should toggle isFetching', () => {
        const action = usersActions.toggleIsFetching(true);
        const newState = usersReducer(initialState, action);

        expect(newState.isFetching).toBe(true);
    });

    test('should toggle following in progress', () => {
        const action = usersActions.toggleFollowingInProgress(1, true);
        const newState = usersReducer(initialState, action);

        expect(newState.followingInProgress.includes(1)).toBe(true);
    });

    test('should set filter', () => {
        const newFilter: UsersFilter = { term: 'developer', friend: true };
        const action = usersActions.setFilter(newFilter);
        const newState = usersReducer(initialState, action);

        expect(newState.filter).toEqual(newFilter);
    });
});
