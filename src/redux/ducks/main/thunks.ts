import {initialized} from "./actions";
import {getAuthUserData} from "../auth/thunks";
import {ThunkAction} from "redux-thunk";
import {State} from "../../store";
import {MainAction} from "./types";

type MainThunk = ThunkAction<Promise<void>, State, unknown, MainAction>
export const initialize = ():MainThunk => async (dispatch) =>{
    dispatch(getAuthUserData());
    dispatch(initialized());
}