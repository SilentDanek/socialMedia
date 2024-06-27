const state = {
    profile: {
        profileInfo: {
            avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s",
            wallpaperURL: "https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg",
            nickName: "Ricardo Milos"
        },
        posts: [
            {
                user: {
                    avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                    nickName: "Billy Harrington"
                },
                likes: 3,
                dislikes: 0,
                message: "Is it you legend?"
            },
            {
                user: {
                    avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                    nickName: "Van Darkholm"
                },
                likes: 12,
                dislikes: 0,
                message: "Your flex is amazing!"
            }],
    },
    dialogs: [
        {name: "Ярик", id: 1},
        {name: "Саша", id: 2},
        {name: "Славик", id: 3},
        {name: "Миша", id: 4}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Привет"},
        {id: 4, message: "Хай"}
    ]

}

export default state;