import {IState} from "../../../interfaces/IState";
import {connect} from "react-redux";
import {Users} from "./Users";
import {ComponentType, useEffect} from "react";
import {follow, unfollow, toggleFollowingInProgress, requestUsers,} from "../../../redux/reducers/usersReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../redux/selectors/usersSelector";


export function UsersContainer(props: any) {
    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize);
    }, []);

    function onPageChanged(pageNumber: number) {
        props.requestUsers(pageNumber, props.pageSize);
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
}

export default compose<ComponentType>(
    connect(mapStateToProps, {follow, unfollow, toggleFollowingInProgress, requestUsers}))(UsersContainer);