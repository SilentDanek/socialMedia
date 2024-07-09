export interface IUser{
    id:number;
    photoURL:string;
    followed:boolean;
    fullname:string;
    status:string;
    location:{
        city:string;
        country:string;
    }
}


export interface IUsersPage{
    users:IUser[];
}
