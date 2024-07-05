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
    addPost:()=>void
}

export function MyPosts(props:IMyPostsProps) {

    function onAddPost(){
        props.addPost();
    }

    function onPostChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        const text = e.target.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.posts}>
            My posts
            <div>
                <textarea
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