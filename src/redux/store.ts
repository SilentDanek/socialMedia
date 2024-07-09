import {dialogsReducer} from "./reducers/dialogsReducer";
import {profileReducer} from "./reducers/profileReducer";
import {sideBarReducer} from "./reducers/sidebarReducer";
import {usersReducer} from "./reducers/usersReducer";
import {configureStore}  from "@reduxjs/toolkit";
import {combineReducers} from '@reduxjs/toolkit'


const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage  : usersReducer,
    sideBar    : sideBarReducer,
})

const store  = configureStore({
    reducer: reducers
})


export default store;