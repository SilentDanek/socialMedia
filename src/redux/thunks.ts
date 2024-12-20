import { usersThunks } from './ducks/users/thunks';
import { mainThunks } from './ducks/main';
import { profileThunks } from './ducks/profile/thunks';
import { authThunks } from './ducks/auth/thunks';
import { bindAllActionCreators } from './helpers';
import { store } from './store';
import { chatThunks } from './ducks/chat/thunks';
import { navbarThunks } from './ducks/navbar/thunks';

export const Thunks = {
    usersThunks,
    mainThunks,
    profileThunks,
    authThunks,
    chatThunks,
    navbarThunks
};

export const boundThunks = bindAllActionCreators(Thunks, store.dispatch);
