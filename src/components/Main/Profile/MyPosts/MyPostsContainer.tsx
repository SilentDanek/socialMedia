import React from "react";
import {
    updateNewPostText,
    addPost
} from "../../../../redux/actions/actionCreators/profileActionCreators";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {IState} from "../../../../interfaces/IState";

const mapStateToProps = (state:IState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(MyPosts);

export default MyPostsContainer;