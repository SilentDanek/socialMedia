import {ProfileActionTypes} from "./actionTypes";
import {ProfileAction, ProfileState, UserProfile} from "./types";


let initialState: ProfileState = {
    profile: null,
    status: "",
    //Test
    posts: [
        {
            id: 1,
            user: {
                avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                nickName: "Billy Harrington"
            },
            likes: 3,
            dislikes: 0,
            message: "Is it you legend?"
        },
        {
            id: 2,
            user: {
                avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                nickName: "Van Darkholm"
            },
            likes: 12,
            dislikes: 0,
            message: "Your flex is amazing!"
        }],
};

export function profileReducer(state = initialState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case ProfileActionTypes.ADD_POST: {
            // Test
            const newPost = {
                user: {
                    avatarURL: "https://steamuserimages-a.akamaihd.net/ugc/1736675605280339028/3E984442933B76839E2E6F719C780B554603DB14/",
                    nickName: "Anon"
                },
                id: 5,
                message: action.payload.text,
                likes: 0,
                dislikes: 0
            }

            return {
                ...state,
                posts: state.posts.concat(newPost),
            };
        }
        case ProfileActionTypes.DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload.id),
            };
        }
        case ProfileActionTypes.SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload.profile
            };
        }
        case ProfileActionTypes.SET_STATUS: {
            return {
                ...state,
                status: action.payload.status
            };
        }
        case ProfileActionTypes.SET_NEW_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.payload.photos} as UserProfile
            };
        }
        default: {
            return state;
        }
    }
}