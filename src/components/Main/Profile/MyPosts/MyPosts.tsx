import {FC} from "react";
import s from "./MyPosts.module.css";
import {TPost} from "../../../../redux/ducks/profile/types";
import {Post} from "./Post/Post";
import AddNewPostForm from "./AddNewPostForm/AddNewPostForm";


const postElement = (posts: TPost[]) => {
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

type MyPostsProps = {
    posts: TPost[];
    addPost: (values: any) => void;
}
export const MyPosts:FC<MyPostsProps> = ({addPost, posts}) => {
    const onSubmit = (values: any) => {
        addPost(values.newPostText);
    };

    return (
        <div className={s.posts}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onSubmit}/>
            {postElement(posts)}
        </div>
    );
};