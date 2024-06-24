import s from "../Profile.module.css";

function MyPosts() {
    return(
        <div>
            My post
            <div>
                New post
            </div>
            <div className={s.posts}>
                <div className={"item"}>
                    Is it really u legend?
                </div>
                <div className={"item"}>
                    Your flex is amazing
                </div>
            </div>
        </div>
    )
}

export default MyPosts;