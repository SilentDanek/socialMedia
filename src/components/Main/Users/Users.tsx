import {IUser} from "../../../redux/reducers/usersReducer";
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User/User";

export function Users({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}: any) {
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
            {props.users.map((user: IUser) => (
                <User user={user} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress}/>
                ))}
        </div>
    )
}