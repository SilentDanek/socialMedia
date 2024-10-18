import { profileReducer } from './reducer';
import { profileActions } from './actions';
import { ProfileState, Photos, UserProfile } from './types';

describe('profileReducer', () => {
    const initialState: ProfileState = {
        profile: null,
        status: '',
        isFollowed: false
    };

    const mockUserProfile: UserProfile = {
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
        lookingForAJobDescription: 'I am looking for a frontend developer job',
        fullName: 'John Doe',
        userId: 1,
        photos: {
            small: 'smallPhotoUrl',
            large: 'largePhotoUrl'
        }
    };

    test('should handle SET_USER_PROFILE', () => {
        const newState = profileReducer(
            initialState,
            profileActions.setUserProfile(mockUserProfile)
        );

        expect(newState.profile).toEqual(mockUserProfile);
    });

    test('should handle SET_STATUS', () => {
        const status = 'Online';
        const newState = profileReducer(initialState, profileActions.setStatus(status));

        expect(newState.status).toBe(status);
    });

    test('should handle SET_NEW_PHOTO', () => {
        const newPhotos: Photos = {
            small: 'newSmallPhotoUrl',
            large: 'newLargePhotoUrl'
        };
        const newState = profileReducer(
            { ...initialState, profile: mockUserProfile },
            profileActions.setNewPhotos(newPhotos)
        );

        expect(newState.profile?.photos).toEqual(newPhotos);
    });

    test('should handle SET_IS_FOLLOWED', () => {
        const isFollowed = true;
        const newState = profileReducer(initialState, profileActions.setIsFollowed(isFollowed));

        expect(newState.isFollowed).toBe(isFollowed);
    });

    test('should return the initial state when action is unknown', () => {
        const newState = profileReducer(initialState, { type: 'UNKNOWN_ACTION' } as any);

        expect(newState).toEqual(initialState);
    });
});
