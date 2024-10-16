import { ThunkAction } from 'redux-thunk';
import { State } from '../../types.ts';
import { profileAPI } from '../../../api/api.ts';
import { NavbarActions } from './types.ts';
import { navbarActions } from './actions.ts';

type NavbarThunk = ThunkAction<Promise<void>, State, unknown, NavbarActions>;

const loadProfilePhoto =
    (id: number): NavbarThunk =>
    async (dispatch) => {
        try {
            const response = await profileAPI.getUserProfile(id);
            const profilePhoto = response.photos.large;
            dispatch(navbarActions.setProfilePhoto(profilePhoto));
        } catch (error) {
            console.error(error);
        }
    };

export const navbarThunks = { loadProfilePhoto };
