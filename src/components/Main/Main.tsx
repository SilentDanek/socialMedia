import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Dialogs from "./Dialogs/Dialogs";
import Profile from "./Profile/Profile";



function Main(props:any) {
    const state = props.appState;
    const profile = state.profile;
    return (
        <main>
            <Routes>
                <Route element={<HomePage/>}/>
                <Route path="/dialogs" element={<Dialogs dialogs={state.dialogs} messages={state.messages}/>}/>
                <Route path="/profile" element={<Profile posts={profile.posts} profileInfo ={profile.profileInfo}/>}/>
            </Routes>
        </main>
    )
}

export default Main;