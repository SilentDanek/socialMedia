import IAction from "../actions/IAction";
import {IUsersPage} from "../../interfaces/IUsersPage";
import UsersActionTypes from "../actions/actionTypes/usersActionTypes";


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
    ]
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
            return {...state, users: state.users.concat(action.payload.users)}
        }
        default: {
            return state;
        }
    }
}