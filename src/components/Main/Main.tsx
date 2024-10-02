import {Route, Routes} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import {Preloader, SuspensePreload} from "../common";
import {FC, lazy} from "react";
import {bindedThunks, useAppSelector, getErrorPageMessage, getIsInitialized} from "../../redux";
import Chat from "./Chat/Chat";
import { styled } from '@mui/material/styles';

const LazyUsers   = lazy(() => import("./Users/Users"));
const LazyDialogs = lazy(() => import("./Dialogs/Dialogs"));
const LazyProfile = lazy(() => import("./Profile/Profile"));
const LazyLogin   = lazy(() => import("./Login/Login"));


export const Main:FC = () => {
    const isInitialized = useAppSelector(getIsInitialized);
    const errorMessage = useAppSelector(getErrorPageMessage);
    const {initialize} = bindedThunks.mainThunks;

    if (!isInitialized) {
        initialize();
        return <Preloader/>;
    }

    return (<StyledMain>
            <SuspensePreload>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/dialogs" element={<LazyDialogs/>}/>
                    <Route path="/profile/:userID?" element={<LazyProfile/>}/>
                    <Route path="/users/*" element={<LazyUsers/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/login" element={<LazyLogin/>}/>
                    <Route path="*" element={<h2>{errorMessage}</h2>}/>
                </Routes>
            </SuspensePreload>
        </StyledMain>
    )
};

const StyledMain = styled('main')(({ theme }) => ({
    backgroundImage: `url(${theme.palette.backgroundImg}), ${theme.palette.backgroundGradient}`,
    flex:1,
    overflow:"auto",
    height:"100%"
}));

