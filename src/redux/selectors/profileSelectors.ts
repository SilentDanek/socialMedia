import {IState} from "../../interfaces/IState";

export const getUserProfile = (state:IState) => {
    return state.profilePage.profile;
};

export const getUserStatus = (state:IState) => {
    return state.profilePage.status;
};