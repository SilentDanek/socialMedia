import {setNewPhotos, setStatus, setUserProfile} from "./actions";
import {toggleIsFetching} from "../users/actions";
import {ProfileAction, UserProfile} from "./types";
import {FormAction, stopSubmit} from "redux-form";
import {profileAPI} from "../../../api/profileAPI";
import {State} from "../../store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {UsersAction} from "../users/types";
import {ResultCodes} from "../../../api/api";

// Определяем универсальный тип Thunk, который принимает типы экшенов как параметр
type Thunk<ReturnType = void, ActionType extends Action = Action> = ThunkAction<Promise<ReturnType>, State, unknown, ActionType>;

// Определяем типы Thunk для Profile
type ProfileThunk = Thunk<void, ProfileAction>;

// Определяем Thunk, который может принимать как ProfileAction, так и FormAction
type Profile_FormThunk = Thunk<void, ProfileAction | FormAction>;

// Определяем Thunk, который может принимать как ProfileAction, так и UsersAction
type Profile_UsersThunk = Thunk<void, ProfileAction | UsersAction>;


export const getStatus = (userId: number): ProfileThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
};

export const updateStatus = (status: string): ProfileThunk => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(setStatus(status));
    }
};


export const requestUserProfile = (userId: number): Profile_UsersThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    const response = await profileAPI.getUserProfile(userId);
    //if(response.resultCode === ResultCodes.InternalServerError){}
    console.log(response)
    dispatch(setUserProfile(response));
    dispatch(toggleIsFetching(false));
};


export const updatePhoto = (photo: FormData): ProfileThunk => async (dispatch) => {
    const response = await profileAPI.updatePhoto(photo);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(setNewPhotos(response.data.photos));
    }
};


export const updateUserProfile = (newProfile: UserProfile): Profile_FormThunk => async (dispatch, getState) => {
    const response = await profileAPI.updateUserProfile(newProfile);
    const userId = getState().auth.id;

    if (response.resultCode === ResultCodes.Success && userId) {
        dispatch(requestUserProfile(userId));
        return;
    }

    const errorMessage: string = response.messages.length
        ? response.messages[0]
        : "Some error";
    let badField;
    if (errorMessage.includes("Contacts")) {
        const match = errorMessage.match(/(\w+)->(\w+)/);
        if (match) {
            badField = {
                [match[1].toLowerCase()]: {
                    [match[2].toLowerCase()]: errorMessage
                }
            };
        }
    } else {
        badField = {_error: errorMessage};
    }

    const action = stopSubmit("editProfile", badField);
    dispatch(action);

    return Promise.reject(errorMessage);
};