const customFetch = (route: Request | string | URL, options?: RequestInit | undefined) => {
    return fetch("https://social-network.samuraijs.com/api/1.0/" + route, {
        credentials: "include",
        headers: {
            "API-KEY": "8535baf1-4bf0-4155-a641-cd65532bc347"
        },
        ...options,
    }).then(response => response.json());
}

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return customFetch(`users?page=${currentPage}&count=${pageSize}`);
    },
    follow(userId: number) {
        return customFetch(`follow/${userId}`, {method: "post"})
    },
    unfollow(userId: number) {
        return customFetch(`follow/${userId}`, {method: "delete"})
    },
    getUserProfile(userID: number){
        return customFetch(`profile/${userID}`)
    },
}

export const authAPI = {
    getAuthUserData(){
        return customFetch(`auth/me`);
    }
}