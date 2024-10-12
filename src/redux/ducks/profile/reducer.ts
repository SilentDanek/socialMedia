import {ProfileActionTypes} from "./actionTypes";
import {ProfileAction, ProfileState, UserProfile} from "./types";

let initialState: ProfileState = {
    profile: null,
    status: "",
    isFollowed: false,
};

export function profileReducer(state = initialState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case ProfileActionTypes.SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload.profile
            };
        }
        case ProfileActionTypes.SET_STATUS: {
            return {
                ...state,
                status: action.payload.status
            };
        }
        case ProfileActionTypes.SET_NEW_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.payload.photos} as UserProfile
            };
        }
        case ProfileActionTypes.SET_IS_FOLLOWED: {
            return {...state, isFollowed: action.payload.isFollowed}
        }
        default: {
            return state;
        }
    }
}