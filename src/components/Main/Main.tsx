import {Routes, Route} from "react-router-dom"
import s from "./Main.module.css"
import HomePage from "./HomePage/HomePage";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader/Preloader";
import {initialize} from "../../redux/reducers/mainReducer";
import {IState} from "../../redux/store";
import {SuspensePreload} from "../common/SuspensePreload/withSuspense";
import React from "react";

const LazyUsersContainer = React.lazy(() => import("./Users/UsersContainer"));
const LazyDialogsContainer = React.lazy(() => import("./Dialogs/DialogsContainer"));
const LazyProfileContainer = React.lazy(() => import("./Profile/ProfileContainer"));
const LazyLoginContainer = React.lazy(() => import("./Login/LoginContainer"));

function Main({isInitialized, initialize}: any) {
    if (!isInitialized) {
        initialize();
        return <Preloader/>;
    }

    return (<main className={s.main}>
            <SuspensePreload>
                <Routes>
                    <Route path="/dialogs" element={<LazyDialogsContainer/>}/>
                    <Route path="/profile/:userID?" element={<LazyProfileContainer/>}/>
                    <Route path="/users" element={<LazyUsersContainer/>}/>
                    <Route path="/login" element={<LazyLoginContainer/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </SuspensePreload>
        </main>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        isInitialized: state.main.isInitialized,
    };
};
export default connect(mapStateToProps, {initialize})(Main);