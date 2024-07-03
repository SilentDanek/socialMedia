import IAction from "../actions/IAction";
import ProfileActionTypes from "../actions/actionTypes/profileActionTypes";

export function profileReducer(state:any, action:IAction) {
    switch (action.type){
        case ProfileActionTypes.UPDATE_NEW_POST_TEXT:{
            updateNewPostText(state, action.payload.text);
            return state;
        }
        case ProfileActionTypes.ADD_POST:{
            addPost(state, action.payload.text);
            return state;
        }
    }
    return state;
}

function addPost(state:any, postMessage:string){
    // Test
    const newPost = {
        user: {
            avatarURL: "https://steamuserimages-a.akamaihd.net/ugc/1736675605280339028/3E984442933B76839E2E6F719C780B554603DB14/",
            nickName: "Anon"
        },
        id:5,
        message:postMessage,
        likes:0,
        dislikes:0
    }

    state.profilePage.posts = state.profilePage.posts.concat(newPost);
}

function updateNewPostText(state:any, newText:string){
    state.profilePage.newPostText = newText;
}