import { State } from '../../types';

export const selectNavbarItems = (state: State) => {
    return state.navbar.navbarItems;
};

export const selectActiveButtonIndex = (state: State) => {
    return state.navbar.selectedButtonIndex;
};
