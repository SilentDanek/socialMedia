import {FC} from "react";
import s from "./MyPosts.module.css";
import {useAppSelector, getPosts, TPost} from "../../../../redux";
import {Post} from "./Post/Post";
import { NewPostForm } from "./NewPostForm/NewPostForm";


const createPostElements = (posts: TPost[]) => {
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
    return (
        <div className={s.posts}>
            <h3>My posts</h3>
            {<NewPostForm/>}
            {createPostElements(posts)}
        </div>
    );
};