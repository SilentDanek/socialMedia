import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return(
        <div className={s.profileWrapper}>
            <div className={s.wallpaper}>
                <img
                    src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg"
                    alt="wallpaper"
                />
            </div>
            <div className={s.profileInfo}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s"
                    alt="Avatar"
                />
                <span>Ricardo Milos</span>
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile;