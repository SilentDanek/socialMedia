import IAction from "../actions/IAction";
import {ISideBar} from "../../interfaces/ISideBar";


const initialState:ISideBar = {

}

export function sideBarReducer(state = initialState, action: IAction):ISideBar {
    switch (state) {

        default:{
            return state;
        }
    }
}
