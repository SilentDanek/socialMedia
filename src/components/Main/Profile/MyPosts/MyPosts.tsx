import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import React from "react";
import {updateNewPostTextAction, createAddPostAction} from "../../../../redux/actions/actionCreators/profileActionCreators";

interface postInfo {
    id:number
    user: {
        avatarURL: string,
        nickName: string
    }
    likes: number;
    dislikes:number;
    message: string;
}

function postElement(posts:postInfo[]) {
    return posts.map(({user, message, likes,dislikes})=>{
        return  <Post
            user={{
                avatarURL: user.avatarURL,
                nickName: user.nickName
            }}
            likes={likes}
            dislikes={dislikes}
            message={message}
        />
    })
}

function MyPosts(props:any) {
    const newPostText:React.RefObject<HTMLTextAreaElement> = React.createRef();

    function addPost(){
        if(!newPostText.current) return;

        const text = newPostText.current.value;
        const action = createAddPostAction(text);

        props.dispatch(action);
    }

    function onPostChange(){
        if(!newPostText.current) return;

        const text = newPostText.current.value;
        const action = updateNewPostTextAction(text);

        props.dispatch(action);
    }

    return (
        <div className={s.posts}>
            My posts
            <div>
                <textarea
                    ref={newPostText}
                    onChange={onPostChange}
                    value={props.newPostText}
                    placeholder={"Enter your post message"}
                />
                <button onClick={addPost}>Add new post</button>
            </div>
            {postElement(props.posts)}
        </div>
    )
}

export default MyPosts;