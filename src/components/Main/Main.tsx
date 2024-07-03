import React from "react";
import {Routes, Route} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Dialogs from "./Dialogs/Dialogs";
import Profile from "./Profile/Profile";


function Main(props: any) {
    const state = props.state;
    return (
        <main>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/dialogs" element = {
                    <Dialogs
                        dialogsPage = {state.dialogsPage}
                        dispatch    = {props.dispatch}
                    />}
                />
                <Route path="/profile" element = {
                    <Profile
                        profilePage = {state.profilePage}
                        dispatch    = {props.dispatch}
                    />
                }/>
            </Routes>
        </main>
    )
}

export default Main;