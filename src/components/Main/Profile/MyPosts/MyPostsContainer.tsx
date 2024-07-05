import React from "react";
import {updateNewPostTextAction, createAddPostAction} from "../../../../redux/actions/actionCreators/profileActionCreators";
import {MyPosts} from "./MyPosts";

function MyPostsContainer(props:any) {
    const state = props.store.getState();

    function addPost(){
        const action = createAddPostAction();

        props.store.dispatch(action);
    }

    function onPostChange(text:string){
        const action = updateNewPostTextAction(text);

        props.store.dispatch(action);
    }

    return (
        <MyPosts
            addPost={addPost}
            updateNewPostText={onPostChange}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    )
}

export default MyPostsContainer;