import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {required,maxLengthCreator, minLengthCreator} from "../../../../utils/validators/validators";
import {ValidatedElement} from "../../../common/FormControls/FormControls";
import {IPost} from "../../../../redux/reducers/profileReducer";

const maxLengthPost= maxLengthCreator(30);
const minLengthPost= minLengthCreator(3);
const Textarea = ValidatedElement("textarea");

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name={"newPostText"}
                placeholder={"Enter your post message"}
                validate={[required, minLengthPost, maxLengthPost]}
            />
            <button>Add new post</button>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);


interface IMyPostsProps {
    posts: IPost[];
    addPost(text:string):void;
}
export const MyPosts = (props: IMyPostsProps) => {

    const onSubmit = (values:any) => {
        props.addPost(values.newPostText);
    }

    const postElement =(posts: IPost[]) => {
        return posts.map(({user, message, likes, dislikes, id}) => {
            return <Post
                key={id}
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