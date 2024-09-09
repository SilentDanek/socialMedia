import { usersActions } from "./ducks/users/actions";
import { mainActions } from "./ducks/main";
import { profileActions } from "./ducks/profile/actions";
import { authActions } from "./ducks/auth/actions";
import { dialogsActions } from "./ducks/dialogs/actions";
import { store } from "./store";
import { bindAllActionCreators } from "./helpers";
import { bindActionCreators } from "redux";
import { chatActions } from "./ducks/chat/actions";


export const actions = {
    usersActions,
    mainActions,
    profileActions,
    authActions,
    dialogsActions,
    chatActions
};

bindActionCreators(actions.usersActions, store.dispatch);
/*todo: Удалить as typeof actions после успешной типизации bindAllActionCreators*/
export const bindedActions = bindAllActionCreators(actions, store.dispatch) as typeof actions;
