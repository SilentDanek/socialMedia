import {
    updateNewPostText,
    addPost
} from "../../../../redux/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {IState} from "../../../../interfaces/IState";

const mapStateToProps = (state:IState) => {

    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(MyPosts);
