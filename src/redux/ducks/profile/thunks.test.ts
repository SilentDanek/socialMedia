import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { profileThunks } from './thunks';
import { profileActions } from './actions';
import { usersActions } from '../users/actions';
import { profileAPI } from '../../../api/api';
import { ResultCodes } from '../../../api/api';

jest.mock('../../../api/api'); // Мокаем API

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('profileThunks', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            auth: { id: 1 },
            profilePage: {
                profile: {
                    userId: 1,
                    photos: {
                        small: 'small.jpg',
                        large: 'large.jpg'
                    }
                }
            }
        });
    });

    test('should dispatch setStatus when getStatus is successful', async () => {
        const mockStatus = 'Hello world';
        (profileAPI.getStatus as jest.Mock).mockResolvedValue(mockStatus);

        await store.dispatch(profileThunks.getStatus(1));

        const actions = store.getActions();
        expect(actions[0]).toEqual(profileActions.setStatus(mockStatus));
    });

    test('should dispatch setStatus when updateStatus is successful', async () => {
        (profileAPI.updateStatus as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Success
        });

        await store.dispatch(profileThunks.updateStatus('New status'));

        const actions = store.getActions();
        expect(actions[0]).toEqual(profileActions.setStatus('New status'));
    });

    test('should dispatch toggleIsFetching and setUserProfile when requestUserProfile is successful', async () => {
        const mockUserProfile = {
            aboutMe: 'I am a software developer',
            contacts: {
                facebook: 'facebook.com',
                website: null,
                vk: null,
                twitter: 'twitter.com',
                instagram: 'instagram.com',
                youtube: null,
                github: 'github.com',
                mainLink: null
            },
            lookingForAJob: true,
            lookingForAJobDescription: 'Looking for frontend job',
            fullName: 'John Doe',
            userId: 1,
            photos: {
                small: 'small.jpg',
                large: 'large.jpg'
            }
        };
        (profileAPI.getUserProfile as jest.Mock).mockResolvedValue(mockUserProfile);

        await store.dispatch(profileThunks.requestUserProfile(1));

        const actions = store.getActions();
        expect(actions[0]).toEqual(usersActions.toggleIsFetching(true));
        expect(actions[1]).toEqual(profileActions.setUserProfile(mockUserProfile));
        expect(actions[2]).toEqual(usersActions.toggleIsFetching(false));
    });

    test('should dispatch setNewPhotos when updatePhoto is successful', async () => {
        const mockPhotos = { small: 'newSmall.jpg', large: 'newLarge.jpg' };
        (profileAPI.updatePhoto as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Success,
            data: { photos: mockPhotos }
        });

        await store.dispatch(profileThunks.updatePhoto(new FormData()));

        const actions = store.getActions();
        expect(actions[0]).toEqual(profileActions.setNewPhotos(mockPhotos));
    });

    test('should dispatch setIsFollowed when checkIsFollow is successful', async () => {
        const isFollowed = true;
        (profileAPI.checkIsFollow as jest.Mock).mockResolvedValue(isFollowed);

        await store.dispatch(profileThunks.checkIsFollow(1));

        const actions = store.getActions();
        expect(actions[0]).toEqual(profileActions.setIsFollowed(isFollowed));
    });
});
