import { usersActions } from './ducks/users/actions';
import { mainActions } from './ducks/main';
import { profileActions } from './ducks/profile/actions';
import { authActions } from './ducks/auth/actions';
import { store } from './store';
import { bindAllActionCreators } from './helpers';
import { bindActionCreators } from 'redux';
import { chatActions } from './ducks/chat/actions';
import { navbarActions } from './ducks/navbar/actions.ts';

export const actions = {
    usersActions,
    mainActions,
    profileActions,
    authActions,
    chatActions,
    navbarActions
};

bindActionCreators(actions.usersActions, store.dispatch);

export const boundActions = bindAllActionCreators(actions, store.dispatch);
