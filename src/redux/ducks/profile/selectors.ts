import {State} from "../../types";

export const getUserProfile = (state:State) => {
    return state.profilePage.profile;
};

export const getUserStatus = (state:State) => {
    return state.profilePage.status;
};
