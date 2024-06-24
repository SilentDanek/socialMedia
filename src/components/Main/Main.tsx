import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Dialog from "./Dialog/Dialog";
import Profile from "./Profile/Profile";



function Main() {
    return (
        <main>
            <Routes>
                <Route element={<HomePage/>}/>
                <Route path="/dialog" element={<Dialog/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </main>
    )
}

export default Main;