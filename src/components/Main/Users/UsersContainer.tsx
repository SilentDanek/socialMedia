import {IState} from "../../../interfaces/IState";
import {IUser} from "../../../interfaces/IUsersPage";
import {IDispatch} from "../../../interfaces/IDispatch";
import {connect} from "react-redux";
import {Users} from "./Users";
import {useEffect} from "react";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC
} from "../../../redux/actions/actionCreators/usersActionCreators";



export function UsersContainer(props: any) {
    useEffect(() => {
        fetch(`http://localhost:5000/users?page=${props.currentPage}&count=${props.pageSize}`)
            .then((response) => response.json())
            .then((response) => {
                props.setUsers(response.items);
                props.setTotalUsersCount(response.totalCount);
            });
    }, []);


    function onPageChanged(page: number) {
        props.setCurrentPage(page);

        fetch(`http://localhost:5000/users?page=${page}&count=${props.pageSize}`)
            .then((response) => response.json())
            .then((response) => props.setUsers(response.items));
    }

    return (
        <Users
            follow   = {props.follow  }
            unfollow = {props.unfollow}
            users    = {props.users   }
            pageSize = {props.pageSize}
            currentPage     = {props.currentPage}
            onPageChanged   = {onPageChanged}
            totalUsersCount = {props.totalUsersCount}
        />
    )
}


const mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount,
    };
}

const mapDispatchToProps = (dispatch: IDispatch) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: IUser[]) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);