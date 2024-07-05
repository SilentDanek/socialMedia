import IAction from "../actions/IAction";
import ProfileActionTypes from "../actions/actionTypes/profileActionTypes";
import {IProfilePage} from "../../interfaces/IProfilePage";


let initialState:IProfilePage = {
    profileInfo: {
        avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s",
        wallpaperURL: "https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg",
        nickName: "Ricardo Milos"
    },
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
    newPostText: "Flexzilla"
};

export function profileReducer(state = initialState, action: IAction):IProfilePage {
    switch (action.type) {
        case ProfileActionTypes.UPDATE_NEW_POST_TEXT: {
            return updateNewPostText(state, action.payload.text);
        }
        case ProfileActionTypes.ADD_POST: {
            return addPost(state);
        }
        default: {
            return state;
        }
    }
}

function addPost(state: IProfilePage) {
    // Test
    const newPost = {
        user: {
            avatarURL: "https://steamuserimages-a.akamaihd.net/ugc/1736675605280339028/3E984442933B76839E2E6F719C780B554603DB14/",
            nickName: "Anon"
        },
        id: 5,
        message: state.newPostText,
        likes: 0,
        dislikes: 0
    }

    return {
        ...state,
        posts: state.posts.concat(newPost),
        newPostText: ""
    }
}

function updateNewPostText(state: IProfilePage, newText: string) {
    return {
        ...state,
        newPostText:newText
    };
}