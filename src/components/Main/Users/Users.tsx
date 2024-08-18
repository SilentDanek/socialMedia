import {IUser} from "../../../redux/reducers/usersReducer";
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User/User";
import {memo} from "react";

export const Users = memo(({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}: any) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            {props.users.map((user: IUser) => (
                <User user={user} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress}/>
            ))}
        </div>
    )
});