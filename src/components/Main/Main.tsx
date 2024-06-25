import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Dialogs from "./Dialogs/Dialogs";
import Profile from "./Profile/Profile";



function Main() {
    return (
        <main>
            <Routes>
                <Route element={<HomePage/>}/>
                <Route path="/dialogs" element={<Dialogs/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </main>
    )
}

export default Main;