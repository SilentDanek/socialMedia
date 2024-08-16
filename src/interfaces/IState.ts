import {ISideBar} from "./ISideBar";
import {IAuth} from "./IAuth";
import {IMainPreload} from "./IMainPreload";
import {IUsersPage} from "../redux/reducers/usersReducer";
import {IDialogsPage} from "../redux/reducers/dialogsReducer";
import {IProfilePage} from "../redux/reducers/profileReducer";

export interface IState {
    profilePage: IProfilePage,
    dialogsPage: IDialogsPage,
    sideBar    : ISideBar,
    usersPage  : IUsersPage,
    auth       : IAuth
    main       : IMainPreload
}