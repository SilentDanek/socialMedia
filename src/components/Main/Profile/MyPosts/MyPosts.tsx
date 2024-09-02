import {FC} from "react";
import s from "./MyPosts.module.css";
import {bindedActions, useAppSelector, getPosts, TPost} from "../../../../redux";
import {Post} from "./Post/Post";
import AddNewPostForm from "./AddNewPostForm/AddNewPostForm";


const postElements = (posts: TPost[]) => {
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


export const MyPosts:FC = () => {
    const posts = useAppSelector(getPosts);
    const {addPost} = bindedActions.profileActions;

    type FormDataType = {
        newPostText:string;
    }
    const handleSubmit = (values: FormDataType) => {
        addPost(values.newPostText);
    };

    return (
        <div className={s.posts}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={handleSubmit}/>
            {postElements(posts)}
        </div>
    );
};