import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {IPost} from "../../../../interfaces/IProfilePage";

function postElement(posts:IPost[]) {
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

interface IMyPostsProps {
    posts: IPost[];
    newPostText: string;
    updateNewPostText:(text:string)=>void
    addPost:(text:string)=>void
}

export function MyPosts(props:IMyPostsProps) {
    const newPostText:React.RefObject<HTMLTextAreaElement> = React.createRef();

    function onAddPost(){
        if(!newPostText.current) return;

        const text = newPostText.current.value;
        props.addPost(text);
    }

    function onPostChange(){
        if(!newPostText.current) return;

        const text = newPostText.current.value;
        props.updateNewPostText(text);
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
                <button onClick={onAddPost}>Add new post</button>
            </div>
            {postElement(props.posts)}
        </div>
    )
}