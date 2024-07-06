import React from "react";
import {
    updateNewPostTextAction,
    createAddPostAction
} from "../../../../redux/actions/actionCreators/profileActionCreators";
import {MyPosts} from "./MyPosts";
import {StoreContext} from "../../../../StoreContext";

function MyPostsContainer(props: any) {
    return (
        <StoreContext.Consumer>{
            (store) => {
                if (!store) return;

                const addPost = () => {
                    const action = createAddPostAction();
                    store.dispatch(action);
                }

                const onPostChange = (text: string) => {
                    const action = updateNewPostTextAction(text);
                    store.dispatch(action);
                }

                const state = store.getState();
                return (
                    <MyPosts
                        addPost={addPost}
                        updateNewPostText={onPostChange}
                        posts={state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;