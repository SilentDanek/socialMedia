import s from "./Post.module.css"
import {FC} from "react";

type PostProps = {
    user: {
        avatarURL: string,
        nickName: string
    }
    likes: number;
    dislikes:number;
    message: string;
};
export const Post:FC<PostProps> = ({user, likes, dislikes, message}) => {
    return (
        <div className={s.post}>
            <div className={s.item}>
                <img src={user.avatarURL} alt="avatar"/>
                <div className={s.text}>
                    <span><strong>{user.nickName}</strong></span>
                    <span>{message}</span>
                </div>
            </div>
            <div>
                <span>
                    Like {likes}
                </span>
                &emsp;
                <span>
                    Dislike {dislikes}
                </span>
            </div>
        </div>
    );
};