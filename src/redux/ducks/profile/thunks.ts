import { profileActions } from './actions';
import { usersActions } from '../users/actions';
import { ProfileAction, UserProfile } from './types';
import { State } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { profileAPI, ResultCodes } from '../../../api';
import { deepNoRefEqual } from '../../../utils';
import { ContactFormError, FormError } from '../../../api/APIErrors.ts';
import { UsersAction } from '../users/types.ts';

type ProfileThunk = ThunkAction<Promise<void>, State, unknown, ProfileAction | UsersAction>;

const getStatus =
    (userId: number): ProfileThunk =>
    async (dispatch) => {
        const response = await profileAPI.getStatus(userId);
        dispatch(profileActions.setStatus(response));
    };

const updateStatus =
    (status: string): ProfileThunk =>
    async (dispatch) => {
        const response = await profileAPI.updateStatus(status);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setStatus(status));
        }
    };

const requestUserProfile =
    (userId: number): ProfileThunk =>
    async (dispatch) => {
        dispatch(usersActions.toggleIsFetching(true));

        const response = await profileAPI.getUserProfile(userId);
        dispatch(profileActions.setUserProfile(response));
        dispatch(usersActions.toggleIsFetching(false));
    };

const updatePhoto =
    (photo: FormData): ProfileThunk =>
    async (dispatch) => {
        const response = await profileAPI.updatePhoto(photo);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setNewPhotos(response.data.photos));
        }
    };

const updateUserProfile =
    (newProfile: UserProfile): ProfileThunk =>
    async (dispatch, getState) => {
        const userId = getState().auth.id;
        const profile = getState().profilePage.profile;

        if (deepNoRefEqual(newProfile, profile)) return;

        const response = await profileAPI.updateUserProfile(newProfile);

        if (response.resultCode === ResultCodes.Success && userId) {
            await dispatch(requestUserProfile(userId));
        } else if (response.resultCode === ResultCodes.Error) {
            const errorMessage: string = response.messages.length
                ? response.messages[0]
                : 'Some error';

            throw errorMessage.includes('Contacts')
                ? new ContactFormError(errorMessage)
                : new FormError(errorMessage);
        }
    };

const checkIsFollow = (userId: number): ProfileThunk => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.checkIsFollow(userId);
            dispatch(profileActions.setIsFollowed(response));
        } catch {
            /* empty */
        }
    };
};

export const profileThunks = {
    getStatus,
    updateStatus,
    requestUserProfile,
    updatePhoto,
    updateUserProfile,
    checkIsFollow
};
