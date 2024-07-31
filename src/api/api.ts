
const ufetch = (route: Request | string | URL, options?: RequestInit | undefined) =>{
    return fetch("https://social-network.samuraijs.com/api/1.0/" + route,{
        credentials:"include",
        ...options
    }).then(response => response.json());
}

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return ufetch(`users?page=${currentPage}&count=${pageSize}`);
    }
}

export {};