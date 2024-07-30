import s from "./Post.module.css"

interface postInfo {
    user: {
        avatarURL: string,
        nickName: string
    }
    likes: number;
    dislikes:number;
    message: string;
}

export function Post(props: postInfo) {
    return (
        <div className={s.post}>
            <div className={s.item}>
                <img src={props.user.avatarURL} alt="avatar"/>
                <div className={s.text}>
                    <span><strong>{props.user.nickName}</strong></span>
                    <span>{props.message}</span>
                </div>
            </div>
            <div>
                <span>
                    Like {props.likes}
                </span>
                &emsp;
                <span>
                    Dislike {props.dislikes}
                </span>
            </div>
        </div>
    )
}