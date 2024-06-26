import s from "./MyPosts.module.css"
import Post from "./Post/Post";

interface postInfo {
    user: {
        avatarURL: string,
        nickName: string
    }
    massage: string;
}

function postElement(posts:postInfo[]) {
    return posts.map(({user, massage})=>{
        return  <Post
            user={{
                avatarURL: user.avatarURL,
                nickName: user.nickName
            }}
            massage={massage}
        />
    })
}

function MyPosts() {

    const tempStore:postInfo[] = [
        {
            user:{
                avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                nickName: "Billy Harrington"
            },
            massage: "Is it you legend?"
        },
        {
            user:{
                avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                nickName: "Van Darkholm"
            },
            massage: "Your flex is amazing!"
        },
    ]

    return (
        <div className={s.posts}>
            My posts
            <div>
                <textarea/>
                <button>Add new post</button>
            </div>
            {postElement(tempStore)}
        </div>
    )
}

export default MyPosts;