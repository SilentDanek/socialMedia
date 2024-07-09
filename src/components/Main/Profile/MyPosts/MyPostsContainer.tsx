import React from "react";
import {
    newPostTextAC,
    addPostAC
} from "../../../../redux/actions/actionCreators/profileActionCreators";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {IState} from "../../../../interfaces/IState";
import {IDispatch} from "../../../../interfaces/IDispatch";


const mapStateToProps = (state:IState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

const mapDispatchToProps = (dispatch:IDispatch)=>{
    return {
        addPost: () => {
            const action = addPostAC();
            dispatch(action);
        },
        updateNewPostText: (text: string) => {
            const action = newPostTextAC(text);
            dispatch(action);
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;