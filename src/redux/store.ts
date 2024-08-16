import {dialogsReducer}  from "./reducers/dialogsReducer";
import {profileReducer}  from "./reducers/profileReducer";
import {sideBarReducer}  from "./reducers/sidebarReducer";
import {usersReducer}    from "./reducers/usersReducer";
import {authReducer}     from "./reducers/authReduced";
import {configureStore}  from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer as formReducer} from "redux-form";
import {mainReducer} from "./reducers/mainReducer";
import {ISideBar} from "./reducers/sidebarReducer";
import {IAuth} from "./reducers/authReduced";
import {IMain} from "./reducers/mainReducer";
import {IUsersPage} from "./reducers/usersReducer";
import {IDialogsPage} from "./reducers/dialogsReducer";
import {IProfilePage} from "./reducers/profileReducer";

export interface IState {
    profilePage: IProfilePage,
    dialogsPage: IDialogsPage,
    sideBar    : ISideBar,
    usersPage  : IUsersPage,
    auth       : IAuth
    main       : IMain
}

const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage  : usersReducer,
    sideBar    : sideBarReducer,
    auth       : authReducer,
    main       : mainReducer,
    form       : formReducer
})

export const store  = configureStore({
    reducer: reducers
})