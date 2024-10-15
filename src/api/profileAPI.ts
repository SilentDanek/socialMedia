import { Photos, UserProfile } from '../redux';
import { DefaultResponse, instance } from './api';

type GetStatusResponse = string;
type GetUserProfileResponse = DefaultResponse & UserProfile;
type UpdateUserProfileResponse = DefaultResponse & UserProfile;
type UpdatePhotoResponse = DefaultResponse & { data: { photos: Photos } };

export const profileAPI = {
    async getStatus(userID: number) {
        const response = await instance.get<GetStatusResponse>(`profile/status/${userID}`);
        return response.data;
    },
    async updateStatus(status: string) {
        const response = await instance.put<DefaultResponse>('profile/status', { status });
        return response.data;
    },
    async getUserProfile(userID: number) {
        const response = await instance.get<GetUserProfileResponse>(`profile/${userID}`);
        return response.data;
    },
    async updateUserProfile(newProfile: UserProfile) {
        const response = await instance.put<UpdateUserProfileResponse>('profile', newProfile);
        return response.data;
    },
    async updatePhoto(file: FormData) {
        const response = await instance.put<UpdatePhotoResponse>('profile/photo', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    async checkIsFollow(userId: number) {
        const response = await instance.get<boolean>(`follow/${userId}`);
        return response.data;
    }
};
