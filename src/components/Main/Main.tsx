import {Routes, Route} from "react-router-dom"
import s from "./Main.module.css"
import HomePage from "./HomePage/HomePage";
import {Preloader} from "../common/Preloader/Preloader";
import {SuspensePreload} from "../common/SuspensePreload/withSuspense";
import {FC, lazy} from "react";

const LazyUsersContainer = lazy(() => import("./Users/UsersContainer"));
const LazyDialogsContainer = lazy(() => import("./Dialogs/DialogsContainer"));
const LazyProfileContainer = lazy(() => import("./Profile/ProfileContainer"));
const LazyLoginContainer = lazy(() => import("./Login/LoginFormContainer"));

type MainProps = {
    isInitialized: boolean;
    initialize: () => void;
    errorMessage:string;
}

export const Main:FC<MainProps> = ({isInitialized, initialize, errorMessage}) => {
    if (!isInitialized) {
        initialize();
        return <Preloader/>;
    }

    return (<main className={s.main}>
            <SuspensePreload>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/dialogs" element={<LazyDialogsContainer/>}/>
                    <Route path="/profile/:userID?" element={<LazyProfileContainer/>}/>
                    <Route path="/users" element={<LazyUsersContainer/>}/>
                    <Route path="/login" element={<LazyLoginContainer/>}/>
                    <Route path="*" element={<h2>{errorMessage}</h2>}/>
                </Routes>
            </SuspensePreload>
        </main>
    )
};