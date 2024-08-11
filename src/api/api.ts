import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "8535baf1-4bf0-4155-a641-cd65532bc347" },
    withCredentials: true
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
}


export const authAPI = {
    getAuthUserData(){
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email:string, password:string, rememberMe = false){
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },
    logout(){
        return instance.delete(`auth/login`).then(response => response.data);
    },
}

export const profileAPI = {
    getStatus(userID: number){
        return instance.get(`profile/status/${userID}`).then(response => response.data);
    },
    updateStatus(status: string){
        return instance.put(`profile/status`, {status}).then(response => response.data);
    },
    getUserProfile(userID: number){
        return instance.get(`profile/${userID}`).then(response => response.data);
    },
}