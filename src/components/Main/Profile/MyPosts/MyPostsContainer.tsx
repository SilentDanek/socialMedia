import {addPost} from "../../../../redux/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {IState} from "../../../../redux/store";

const mapStateToProps = (state:IState) => {
    return {
        posts: state.profilePage.posts,
    }
}

export const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts);
