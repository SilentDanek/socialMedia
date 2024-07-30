import {IAction} from "../../interfaces/IAction";
import {IUsersPage} from "../../interfaces/IUsersPage";
import {UsersActionTypes} from "../actions/actionTypes/usersActionTypes";

const initialState: IUsersPage = {
    users: [
/*        {
            id: 1,
            photoURL: "https://i.ytimg.com/vi/9iVsbli8Cs0/maxresdefault.jpg",
            followed: true,
            fullname: "Ярик",
            status: "Учу прогу",
            location: {
                city: "Ахтырка",
                country: "Украина"
            }
        },
        {
            id: 2,
            photoURL: "https://i1.sndcdn.com/avatars-5jUjsbHgYzArXQ6M-tjdn5g-t500x500.jpg",
            followed: false,
            fullname: "Славик",
            status: "Бавлюсь в раст",
            location: {
                city: "Краковець",
                country: "Украина"
            }
        },
        {
            id: 3,
            photoURL: "https://i1.sndcdn.com/artworks-000287672720-rukn20-t500x500.jpg",
            followed: false,
            fullname: "Майкл",
            status: "Гортаю ТикТок",
            location: {
                city: "Краковець",
                country: "Украина"
            }
        },*/
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

export function usersReducer(state = initialState, action: IAction): IUsersPage {
    switch (action.type) {
        case UsersActionTypes.FOLLOW: {
            return {
                ...state,
                users: state.users.map(
                    (user) => {
                        // @ts-ignore
                        if (user.id === +action.payload.id) {
                            return {...user, followed: true};
                        }
                        return user;
                    })
            };
        }
        case UsersActionTypes.UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(
                    (user) => {
                        // @ts-ignore
                        if (user.id === +action.payload.id) {
                            return {...user, followed: false};
                        }
                        return user;
                    })
            };
        }
        case UsersActionTypes.SET_USERS:{
            // @ts-ignore
            return {...state, users: action.payload.users}
        }
        case UsersActionTypes.SET_CURRENT_PAGE:{
            // @ts-ignore
            return {...state,currentPage: action.payload.currentPage}
        }
        case UsersActionTypes.SET_TOTAL_USERS_COUNT:{
            // @ts-ignore
            return {...state,totalUsersCount: action.payload.totalUsersCount}
        }
        case UsersActionTypes.TOGGLE_IS_FETCHING:{
            // @ts-ignore
            return {...state, isFetching: action.payload.isFetching}
        }
        default: {
            return state;
        }
    }
}