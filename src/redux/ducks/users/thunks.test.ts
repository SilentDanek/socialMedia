import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { usersThunks } from './thunks';
import { usersActions } from './actions';
import { userAPI, ResultCodes } from '../../../api/api';

jest.mock('../../../api/api'); // Мокаем API

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('usersThunks', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            usersPage: {
                users: [],
                pageSize: 10,
                totalUsersCount: 0,
                currentPage: 1,
                isFetching: false,
                followingInProgress: [],
                filter: { term: '', friend: null }
            }
        });
    });

    test('dispatches the correct actions on successful requestUsers', async () => {
        const mockResponse = {
            items: [
                {
                    id: 1,
                    name: 'John Doe',
                    followed: false,
                    uniqueUrlName: null,
                    photos: {
                        small: null,
                        large: null
                    },
                    status: 'Active'
                }
            ],
            totalCount: 1
        };
        (userAPI.getUsers as jest.Mock).mockResolvedValue(mockResponse);

        await store.dispatch(usersThunks.requestUsers(1, 10, { term: '', friend: null }));

        const actions = store.getActions();
        expect(actions[0]).toEqual(usersActions.toggleIsFetching(true));
        expect(actions[1]).toEqual(usersActions.setFilter({ term: '', friend: null }));
        expect(actions[2]).toEqual(usersActions.setUsers(mockResponse.items));
        expect(actions[3]).toEqual(usersActions.setTotalUsersCount(mockResponse.totalCount));
        expect(actions[4]).toEqual(usersActions.setCurrentPage(1));
        expect(actions[5]).toEqual(usersActions.toggleIsFetching(false));
    });

    test('dispatches followSuccess when follow is successful', async () => {
        (userAPI.follow as jest.Mock).mockResolvedValue({ resultCode: ResultCodes.Success });

        await store.dispatch(usersThunks.follow(1));

        const actions = store.getActions();
        expect(actions[0]).toEqual(usersActions.toggleFollowingInProgress(1, true));
        expect(actions[1]).toEqual(usersActions.followSuccess(1));
        expect(actions[2]).toEqual(usersActions.toggleFollowingInProgress(1, false));
    });

    test('dispatches unfollowSuccess when unfollow is successful', async () => {
        (userAPI.unfollow as jest.Mock).mockResolvedValue({ resultCode: ResultCodes.Success });

        await store.dispatch(usersThunks.unfollow(1));

        const actions = store.getActions();
        expect(actions[0]).toEqual(usersActions.toggleFollowingInProgress(1, true));
        expect(actions[1]).toEqual(usersActions.unfollowSuccess(1));
        expect(actions[2]).toEqual(usersActions.toggleFollowingInProgress(1, false));
    });

    test('handles errors gracefully in requestUsers', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (userAPI.getUsers as jest.Mock).mockRejectedValue(new Error('API Error'));

        await store.dispatch(usersThunks.requestUsers(1, 10, { term: '', friend: null }));

        const actions = store.getActions();
        expect(actions[0]).toEqual(usersActions.toggleIsFetching(true));
        expect(actions[1]).toEqual(usersActions.setFilter({ term: '', friend: null }));
        expect(actions.length).toBe(2);
        expect(consoleSpy).toHaveBeenCalledWith(new Error('API Error'));

        consoleSpy.mockRestore();
    });
});
