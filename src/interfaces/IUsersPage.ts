export interface IUser{
    id:number;
    name:string;
    status:string | null;
    uniqueUrlName: null;
    followed:boolean;
    "photos": {
        "small": string | null,
        "large": string | null
    },
    "location": {
        "country":string,
        "city": string
    },
}



export interface IUsersPage{
    users:IUser[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
}
