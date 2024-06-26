import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile() {
    const avatarURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s";
    const wallpaperURL = "https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg";
    return(
        <div className={s.profileWrapper}>
            <ProfileInfo avatarURL={avatarURL} wallpaperURL={wallpaperURL} nickName={"Ricardo Milos"}/>
            <MyPosts/>
        </div>
    )
}

export default Profile;