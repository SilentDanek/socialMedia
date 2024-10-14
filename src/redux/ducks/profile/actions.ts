import { ProfileActionTypes } from './actionTypes';
import { Photos, UserProfile } from './types';

export const profileActions = {
    setUserProfile: (profile: UserProfile) =>
        ({
            type: ProfileActionTypes.SET_USER_PROFILE,
            payload: { profile }
        }) as const,
    setStatus: (status: string) =>
        ({
            type: ProfileActionTypes.SET_STATUS,
            payload: { status }
        }) as const,
    setNewPhotos: (photos: Photos) =>
        ({
            type: ProfileActionTypes.SET_NEW_PHOTO,
            payload: { photos }
        }) as const,
    setIsFollowed: (isFollowed: boolean) =>
        ({
            type: ProfileActionTypes.SET_IS_FOLLOWED,
            payload: { isFollowed }
        }) as const
};
