import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Profile from "./Profile/Profile";
import DialogsContainer from "./Dialogs/DialogsContainer";


function Main(props: any) {
    return (
        <main>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/dialogs" element = {<DialogsContainer/>}/>
                <Route path="/profile" element = {<Profile/>}/>
            </Routes>
        </main>
    )
}

export default Main;