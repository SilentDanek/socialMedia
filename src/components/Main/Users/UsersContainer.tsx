import {IState} from "../../../interfaces/IState";
import {connect} from "react-redux";
import {Users} from "./Users";
import {useEffect} from "react";
import {follow, unfollow, toggleFollowingInProgress, getUsers,} from "../../../redux/reducers/usersReducer";
import {Preloader} from "../../common/Preloader/Preloader";


export function UsersContainer(props: any) {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize);
    }, []);

    function onPageChanged(pageNumber: number) {
        props.getUsers(pageNumber, props.pageSize);
    }

    return (
        <>
            {
                props.isFetching ?
                    <Preloader/> :
                    <Users
                        follow={props.follow}
                        unfollow={props.unfollow}
                        users={props.users}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        onPageChanged={onPageChanged}
                        totalUsersCount={props.totalUsersCount}
                        followingInProgress={props.followingInProgress}
                    />
            }
        </>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    };
}

export default connect(mapStateToProps, {follow, unfollow, toggleFollowingInProgress, getUsers })(UsersContainer);