export interface IUser{
    id:number;
    name:string;
    uniqueUrlName: null;
    photos: {
        small: string | null,
        large: string | null
    },
    status:string | null;
    followed:boolean;
}



export interface IUsersPage{
    users:IUser[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: number[]
}
