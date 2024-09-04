import {mainActions} from "./actions";
import {authThunks} from "../auth/thunks";
import {ThunkAction} from "redux-thunk";
import {State} from "../../types";
import {MainAction} from "./types";

type MainThunk = ThunkAction<Promise<void>, State, unknown, MainAction>;
const initialize = ():MainThunk => async (dispatch) =>{
    await dispatch(authThunks.getAuthUserData());
    await dispatch(mainActions.initialized());
}

export const mainThunks = {
    initialize
}