import { dialogsReducer } from "./ducks/dialogs/reducer";
import { profileReducer } from "./ducks/profile/reducer";
import { sidebarReducer } from "./ducks/sidebar/reducer";
import { usersReducer } from "./ducks/users/reducer";
import { authReducer } from "./ducks/auth/reducer";
import { mainReducer } from "./ducks/main/reducer";
import { chatReducer } from "./ducks/chat/reducer";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, State } from "./types";



export const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    sideBar: sidebarReducer,
    auth: authReducer,
    main: mainReducer,
    chat: chatReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;