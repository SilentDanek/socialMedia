import {MyPosts} from "./MyPosts";
import {useAppSelector} from "../../../../redux/store";
import {addPost} from "../../../../redux/ducks/profile/actions";
import {getPosts} from "../../../../redux/ducks/profile/selectors";
import {useActions} from "../../../../hooks/useActions";


const MyPostsContainer = () => {
    const posts = useAppSelector(getPosts);
    const [addPostD] = useActions([addPost]);

    return <MyPosts addPost={addPostD} posts={posts}/>;
}

export default MyPostsContainer;