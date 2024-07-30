import {dialogsReducer}  from "./reducers/dialogsReducer";
import {profileReducer}  from "./reducers/profileReducer";
import {sideBarReducer}  from "./reducers/sidebarReducer";
import {usersReducer}    from "./reducers/usersReducer";
import {authReducer}     from "./reducers/authReduced";
import {configureStore}  from "@reduxjs/toolkit";
import {combineReducers} from '@reduxjs/toolkit'



const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage  : usersReducer,
    sideBar    : sideBarReducer,
    auth       : authReducer,
})

export const store  = configureStore({
    reducer: reducers
})