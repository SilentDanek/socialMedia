import {TUser} from "../../../redux/ducks/users/types";
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User/User";
import {FC, memo} from "react";
import {Preloader} from "../../common/Preloader/Preloader";

type UsersProps = {
    isFetching: boolean;
    currentPage: number;
    totalUsersCount: number;
    pageSize: number;
    users: TUser[];
    followingInProgress: number[];
    follow: (id: number) => void;
    unfollow: (id: number) => void;
    onPageChanged: (pageNumber: number) => void;
};
export const Users: FC<UsersProps> = memo(({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            {props.isFetching
                ? <Preloader/>
                : props.users.map((user) => (
                    <User key={user.id} user={user} follow={props.follow}
                          unfollow={props.unfollow} followingInProgress={props.followingInProgress}/>
                ))}
        </div>
    )
});