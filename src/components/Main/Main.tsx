import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Profile from "./Profile/Profile";
import UsersContainer from "./Users/UsersContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import s from "./Main.module.css"

function Main() {
    return (
        <main className={s.main}>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/dialogs" element = {<DialogsContainer/>}/>
                <Route path="/profile" element = {<Profile/>}/>
                <Route path="/users" element = {<UsersContainer/>}/>
            </Routes>
        </main>
    )
}

export default Main;