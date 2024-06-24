import s from "./MyPosts.module.css"
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div>
            My post
            <div>
                <textarea/>
                <button>Add new post</button>
            </div>
            <Post user={{
                avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                NickName: "Billy Harrington"
            }}
                  massage={"Is it really u legend?"}
            />
            <Post user={{
                avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                NickName: "Van Darkholm"
            }}
                  massage={"Your flex is amazing"}
            />
        </div>
    )
}

export default MyPosts;