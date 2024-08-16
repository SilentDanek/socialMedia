import {IAction} from "../../interfaces/IAction";

export interface ISideBar{

}
const initialState:ISideBar = {

}

export function sideBarReducer(state = initialState, action: IAction):ISideBar {
    switch (state) {
        default:{
            return state;
        }
    }
}