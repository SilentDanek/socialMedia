import {usersThunks} from "./ducks/users/thunks";
import {mainThunks} from "./ducks/main";
import {profileThunks} from "./ducks/profile/thunks";
import {authThunks} from "./ducks/auth/thunks";
import {bindAllActionCreators} from "./helpers";
import {store} from "./store";

export const Thunks = {
    usersThunks,
    mainThunks,
    profileThunks,
    authThunks,
}

export const bindedThunks = bindAllActionCreators(Thunks, store.dispatch) as typeof Thunks;