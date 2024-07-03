import IAction from "./actions/IAction";
import {dialogsReducer} from "./reducers/dialogsReducer";
import {profileReducer} from "./reducers/profileReducer";

const store = {
    _state:{
        profilePage: {
            profileInfo: {
                avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV3qXCZ7YaJ4MOkCaw17CjrusyoQMp4fFNA&s",
                wallpaperURL: "https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg",
                nickName: "Ricardo Milos"
            },
            posts: [
                {
                    id:1,
                    user: {
                        avatarURL: "https://i1.sndcdn.com/artworks-RWbimAOTSJFzOztu-hjI7tQ-t240x240.jpg",
                        nickName: "Billy Harrington"
                    },
                    likes: 3,
                    dislikes: 0,
                    message: "Is it you legend?"
                },
                {
                    id:2,
                    user: {
                        avatarURL: "https://pbs.twimg.com/profile_images/1345885533256507393/B853M8A4_400x400.jpg",
                        nickName: "Van Darkholm"
                    },
                    likes: 12,
                    dislikes: 0,
                    message: "Your flex is amazing!"
                }],
            newPostText:"Flexzilla"
        },
        dialogsPage:{
            dialogs: [
                {id: 1, name: "Ярик"},
                {id: 2, name: "Саша"},
                {id: 3, name: "Славик"},
                {id: 4, name: "Миша"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Hello"},
                {id: 3, message: "Привет"},
            ],
            newMessageBody:"123321",
        },
        sideBar:{},
    },

    subscribe(observer:any){
        this._callSubscriber = observer;
    },

    dispatch(action:IAction){
        this._state = dialogsReducer(this._state, action);
        this._state = profileReducer(this._state, action);

        this._callSubscriber(this._state);
    },

    getState(){
        return this._state;
    },

    _callSubscriber(...args:any[]){
        console.log("No one subscribe yet")
    }
}

export default store;