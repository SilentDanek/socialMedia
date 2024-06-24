import s from "./Post.module.css"

interface postInfo {
    user: {
        avatarURL: string,
        NickName: string
    }
    massage: string;
}

function Post(props: postInfo) {
    return (
        <div className={s.posts}>
            <div className={s.item}>
                <img src={props.user.avatarURL} alt="avatar"/>
                <div className={s.text}>
                    <span><strong>{props.user.NickName}</strong></span>
                    <span>{props.massage}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;