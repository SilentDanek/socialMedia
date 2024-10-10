import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import { Preloader, SuspensePreload } from "../common";
import { FC, lazy, useEffect } from "react";
import {
    bindedThunks,
    getAuthStatus,
    getAuthUserId,
    getErrorPageMessage,
    getIsInitialized,
    useAppSelector
} from "../../redux";
import { MainContent } from "./Main.style";

const LazyUsers = lazy(() => import("./Users/Users"));
const LazyDialogs = lazy(() => import("./Dialogs/Dialogs"));
const LazyProfile = lazy(() => import("./Profile/Profile"));
const LazyLogin = lazy(() => import("./Login/Login"));
const LazyChat = lazy(() => import("./Chat/GlobalChat.tsx"));

const ProtectedRoute = ({ isAuth, navigateTo }: { isAuth: boolean, navigateTo: string }) => {
    return isAuth ? <Outlet /> : <Navigate to={navigateTo} />;
};

export const Main: FC = () => {
    const errorMessage = useAppSelector(getErrorPageMessage);
    const isAuth = useAppSelector(getAuthStatus);
    const isInitialized = useAppSelector(getIsInitialized);
    const id = useAppSelector(getAuthUserId);

    const { initialize } = bindedThunks.mainThunks;

    useEffect(() => {
        initialize();
    }, []);

    return (<MainContent>
            {isInitialized?
                <SuspensePreload>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile/:userID" element={<LazyProfile />} />
                        <Route path="/users/*" element={<LazyUsers />} />
                        <Route element={<ProtectedRoute isAuth={isAuth} navigateTo={"/login"} />}>
                            <Route path="/dialogs" element={<LazyDialogs />} />
                            <Route path="/chat" element={<LazyChat />} />
                        </Route>
                        <Route element={<ProtectedRoute isAuth={!isAuth} navigateTo={`/profile/${id}`} />}>
                            <Route path="/login" element={<LazyLogin />} />
                        </Route>
                        <Route path="*" element={<h2>{errorMessage}</h2>} />
                    </Routes>
                </SuspensePreload>
                :<Preloader/>
            }
        </MainContent>
    );
};



