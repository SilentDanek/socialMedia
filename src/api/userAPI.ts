import {DefaultResponse, instance} from "./api";
import {TUser} from "../redux/ducks/users/types";

type GetUsersResponse = DefaultResponse & {
    items: TUser[];
    totalCount: number;
};
type FollowResponse = DefaultResponse;
type UnfollowResponse = DefaultResponse;
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<FollowResponse>(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId: number) {
        return instance.delete<UnfollowResponse>(`follow/${userId}`).then(response => response.data);
    }
}