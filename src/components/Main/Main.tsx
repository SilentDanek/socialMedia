import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Dialogs from "./Dialogs/Dialogs";
import Profile from "./Profile/Profile";


function Main(props: any) {
    return (
        <main>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/dialogs" element = {
                    <Dialogs store={props.store}/>
                }/>
                <Route path="/profile" element = {
                    <Profile store={props.store}/>
                }/>
            </Routes>
        </main>
    )
}

export default Main;