export interface IUser{
    name:string;
    id:number;
    uniqueUrlName: null,
    "photos": {
        "small": string | null,
        "large": string | null
    },
    followed:boolean;
    status:string | null;
}



export interface IUsersPage{
    users:IUser[];
}
