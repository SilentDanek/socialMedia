import {IProfilePage} from "./IProfilePage"
import {IDialogsPage} from "./IDialogsPage";
import {ISideBar} from "./ISideBar";
import {IUsersPage} from "./IUsersPage";
import {IAuth} from "./IAuth";


export interface IState {
    profilePage: IProfilePage,
    dialogsPage: IDialogsPage,
    sideBar    : ISideBar,
    usersPage  : IUsersPage,
    auth       : IAuth
}