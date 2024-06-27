import s from "./MyPosts.module.css"
import Post from "./Post/Post";

interface postInfo {
    user: {
        avatarURL: string,
        nickName: string
    }
    likes: number;
    dislikes:number;
    message: string;
}

function postElement(posts:postInfo[]) {
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

function MyPosts(props:any) {
    return (
        <div className={s.posts}>
            My posts
            <div>
                <textarea/>
                <button>Add new post</button>
            </div>
            {postElement(props.posts)}
        </div>
    )
}

export default MyPosts;