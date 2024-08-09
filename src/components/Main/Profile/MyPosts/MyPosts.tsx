import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {IPost} from "../../../../interfaces/IProfilePage";
import {Field, reduxForm} from "redux-form";

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"} name={"newPostText"} placeholder={"Enter your post message"}/>
            <button>Add new post</button>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);


interface IMyPostsProps {
    posts: IPost[];
    addPost(text:string):void;
}
export function MyPosts(props: IMyPostsProps) {

    const onSubmit = (values:any) => {
        props.addPost(values.newPostText);
    }

    const postElement =(posts: IPost[]) => {
        return posts.map(({user, message, likes, dislikes}) => {
            return <Post
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

    return (
        <div className={s.posts}>
            My posts
            <AddNewPostFormRedux onSubmit={onSubmit}/>
            {postElement(props.posts)}
        </div>
    )
}