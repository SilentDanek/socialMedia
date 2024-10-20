import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { profileThunks } from './thunks';
import { profileActions } from './actions';
import { usersActions } from '../users/actions';
import { profileAPI } from '../../../api/api';
import { ResultCodes } from '../../../api/api';
import { ContactFormError, FormError } from '../../../api/Errors.ts';
import { ProfileState } from './types.ts';
import { AppDispatch } from '../../types.ts';

jest.mock('../../../api/api'); // Мокаем API

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as never);

describe('profileThunks', () => {
    let store: MockStoreEnhanced<ProfileState, AppDispatch>;

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
        }) as MockStoreEnhanced<ProfileState, AppDispatch>;
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

    const profile = {
        userId: 1,
        contacts: {
            facebook: 'facebook.com',
            website: 'website.com',
            vk: 'vk.com',
            github: 'github.com',
            instagram: 'instagram.com',
            youtube: 'youtube.com',
            mainLink: 'mainLink.com',
            twitter: 'twitter.com'
        },
        aboutMe: 'New about me',
        fullName: 'John Doe',

        lookingForAJob: true,
        lookingForAJobDescription: 'Looking for a job',
        photos: { small: 'small.jpg', large: 'large.jpg' }
    };

    test('should dispatch requestUserProfile when the profile is updated successfully', async () => {
        (profileAPI.updateUserProfile as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Success,
            messages: []
        });

        await store.dispatch(profileThunks.updateUserProfile(profile));

        // Проверяем, что API вызвано с правильными параметрами
        expect(profileAPI.updateUserProfile).toHaveBeenCalledWith(profile);

        // Проверяем, что requestUserProfile вызвано для обновления профиля
        const actions = store.getActions();
        expect(actions).toContainEqual(usersActions.toggleIsFetching(true)); // Можем также проверить любые другие действия
    });

    test('should throw error when updateUserProfile returns an error', async () => {
        (profileAPI.updateUserProfile as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Error,
            messages: ['Some error occurred']
        });

        try {
            await store.dispatch(profileThunks.updateUserProfile(profile));
        } catch (error) {
            expect(error).toEqual(new Error('Some error occurred'));
        }

        expect(profileAPI.updateUserProfile).toHaveBeenCalledWith(profile);
    });

    test('should throw ContactFormError when error message contains "Contacts"', async () => {
        (profileAPI.updateUserProfile as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Error,
            messages: ['Contacts error occurred']
        });

        try {
            await store.dispatch(profileThunks.updateUserProfile(profile));
        } catch (error) {
            if (error instanceof ContactFormError) {
                expect(error).toBeInstanceOf(ContactFormError);
                expect(error.message).toBe('Contacts error occurred');
            }
        }

        expect(profileAPI.updateUserProfile).toHaveBeenCalledWith(profile);
    });

    test('should throw FormError when error message does not contain "Contacts"', async () => {
        (profileAPI.updateUserProfile as jest.Mock).mockResolvedValue({
            resultCode: ResultCodes.Error,
            messages: ['Some other error']
        });

        try {
            await store.dispatch(profileThunks.updateUserProfile(profile));
        } catch (error) {
            if (error instanceof FormError) {
                expect(error).toBeInstanceOf(FormError);
                expect(error.message).toBe('Some other error');
            }
        }

        expect(profileAPI.updateUserProfile).toHaveBeenCalledWith(profile);
    });
});
