import {connect} from "react-redux";
import {Users} from "./Users";
import {ComponentType, useCallback, useEffect} from "react";
import {
    follow,
    unfollow,
    toggleFollowingInProgress,
    requestUsers,
    setCurrentPage,
} from "../../../redux/reducers/usersReducer";
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
import {IState} from "../../../redux/store";


// Optimized
export function UsersContainer(props: any) {
    //Preload users when the users page opens
    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize);
    }, [props.requestUsers]);

    const onPageChanged = useCallback((pageNumber:number)=>{
        props.requestUsers(pageNumber, props.pageSize);
    },[props.requestUsers]);

    return (
        <>
            {props.isFetching ? <Preloader/> : null}
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
    connect(mapStateToProps, {setCurrentPage, follow, unfollow, toggleFollowingInProgress, requestUsers}))(UsersContainer);