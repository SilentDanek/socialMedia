import {IProfilePage} from "./IProfilePage"
import {IDialogsPage} from "./IDialogsPage";
import {ISideBar} from "./ISideBar";

export interface IState {
    profilePage: IProfilePage,
    dialogsPage: IDialogsPage,
    sideBar    : ISideBar
}