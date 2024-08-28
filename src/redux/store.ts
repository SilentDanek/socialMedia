import {dialogsReducer}  from "./ducks/dialogs/reducer";
import {profileReducer}  from "./ducks/profile/reducer";
import {sidebarReducer}  from "./ducks/sidebar/reducer";
import {usersReducer}    from "./ducks/users/reducer";
import {authReducer}     from "./ducks/auth/reducer";
import {mainReducer}     from "./ducks/main/reducer";
import {configureStore,combineReducers } from "@reduxjs/toolkit";
import {reducer as formReducer} from "redux-form";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage  : usersReducer,
    sideBar    : sidebarReducer,
    auth       : authReducer,
    main       : mainReducer,
    form       : formReducer
})

export const store  = configureStore({
    reducer: rootReducer
});

type RootReducer = typeof rootReducer;
export type State = ReturnType<RootReducer>;

type AppDispatch = typeof store.dispatch;
export type AppActions = Parameters<AppDispatch>[0];

export const useAppDispatch = ():AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<State> = useSelector;