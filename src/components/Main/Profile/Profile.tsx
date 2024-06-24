import s from "./Profile.module.css"

function Profile() {
    return(
        <div className={s.profileWrapper}>
            <div className={s.wallpaper}>
                <img
                    src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg"
                    alt="wallpaper"
                />
            </div>
            <div className={s.profile}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s"
                    alt="Avatar"
                />
                <span>Ricardo Milos</span>
            </div>
            <div>
                My post
                <div>
                    New post
                </div>
                <div className={s.posts}>
                    <div className={"item"}>Is it really u legend?</div>
                    <div className={"item"}>Your flex is amazing</div>
                </div>

            </div>
        </div>
    )
}

export default Profile;