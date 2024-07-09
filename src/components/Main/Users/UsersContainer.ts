import {connect} from "react-redux";
import {IDispatch} from "../../../interfaces/IDispatch";
import {followAC, setUsersAC, unfollowAC} from "../../../redux/actions/actionCreators/usersActionCreators";
import {IState} from "../../../interfaces/IState";
import {Users} from "./Users";
import {IUser} from "../../../interfaces/IUsersPage";


const mapStateToProps = (state:IState) => {
    return {users: state.usersPage.users};
}

const mapDispatchToProps = (dispatch:IDispatch) => {
    return {
        follow: (userId:number)=>{
            dispatch(followAC(userId))
        },
        unfollow: (userId:number)=>{
            dispatch(unfollowAC(userId))
        },
        setUsers:(users:IUser[])=>{
            dispatch(setUsersAC(users));
        }
    }
}

export const UsersContainer = connect(mapStateToProps , mapDispatchToProps)(Users);