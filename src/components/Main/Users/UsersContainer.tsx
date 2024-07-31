import {IState} from "../../../interfaces/IState";
import {connect} from "react-redux";
import {Users} from "./Users";
import {useEffect} from "react";
import {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount,
    toggleIsFetching, toggleFollowingInProgress,
} from "../../../redux/actions/actionCreators/usersActionCreators";
import {Preloader} from "../../common/Preloader/Preloader";
import {userAPI} from "../../../api/api";


export function UsersContainer(props: any) {
    useEffect(() => {
        props.toggleIsFetching(true);
        userAPI.getUsers(props.currentPage, props.pageSize)
            .then((response) => {
                props.setUsers(response.items);
                props.setTotalUsersCount(response.totalCount);
                props.toggleIsFetching(false);
            });
    }, []);

    function onPageChanged(page: number) {
        props.toggleIsFetching(true);
        props.setCurrentPage(page);

        userAPI.getUsers(props.currentPage, props.pageSize)
            .then((response) => {
                props.setUsers(response.items);
                props.toggleIsFetching(false);
            });
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
                        toggleFollowingInProgress={props.toggleFollowingInProgress}
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

export default connect(mapStateToProps, {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount,
    toggleIsFetching, toggleFollowingInProgress
})(UsersContainer);