import { DefaultResponse, instance } from './index.ts';
import { TUser } from '../redux';

type GetUsersResponse = DefaultResponse & {
    items: TUser[];
    totalCount: number;
};
type FollowResponse = DefaultResponse;
type UnfollowResponse = DefaultResponse;

export const userAPI = {
    async getUsers(
        currentPage = 1,
        pageSize = 10,
        term: string = '',
        friend: null | boolean = null
    ) {
        const response = await instance.get<GetUsersResponse>(
            `users?page=${currentPage}&count=${pageSize}&term=${term}` +
                (friend === null ? '' : `&friend=${friend}`)
        );
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<FollowResponse>(`follow/${userId}`);
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<UnfollowResponse>(`follow/${userId}`);
        return response.data;
    }
};
