import {IState} from "../../../interfaces/IState";
import {connect} from "react-redux";
import {Users} from "./Users";
import {useEffect} from "react";
import {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching,
} from "../../../redux/actions/actionCreators/usersActionCreators";
import {Preloader} from "../../common/Preloader/Preloader";

export function UsersContainer(props: any) {
    useEffect(() => {
        props.toggleIsFetching(true);
        fetch(`http://localhost:5000/users?page=${props.currentPage}&count=${props.pageSize}`)
            .then((response) => response.json())
            .then((response) => {
                props.setUsers(response.items);
                props.setTotalUsersCount(response.totalCount);
                props.toggleIsFetching(false);
            });
    }, []);

    function onPageChanged(page: number) {
        props.toggleIsFetching(true);
        props.setCurrentPage(page);

        fetch(`http://localhost:5000/users?page=${page}&count=${props.pageSize}`)
            .then((response) => response.json())
            .then((response) => {
                props.setUsers(response.items);
                props.toggleIsFetching(false);
            });
    }

    return (
        <>
            {
                props.isFetching?
                    <Preloader/>:
                    <Users
                        follow={props.follow}
                        unfollow={props.unfollow}
                        users={props.users}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        onPageChanged={onPageChanged}
                        totalUsersCount={props.totalUsersCount}
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
        isFetching: state.usersPage.isFetching
    };
}

export default connect(mapStateToProps, {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching,
})(UsersContainer);