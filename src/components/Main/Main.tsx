import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Preloader, SuspensePreload } from '../common';
import { FC, lazy, useEffect } from 'react';
import {
    boundThunks,
    getAuthStatus,
    getAuthUserId,
    getIsInitialized,
    useAppSelector
} from '@/redux';
import { MainContent } from './Main.style.tsx';
import { NotFound } from '@components/Main/NotFound/NotFound.tsx';

const LazyUsers = lazy(() => import('./Users/Users'));
const LazyDialogs = lazy(() => import('./Dialogs/Dialogs'));
const LazyProfile = lazy(() => import('./Profile/Profile'));
const LazyLogin = lazy(() => import('./Login/Login'));
const LazyChat = lazy(() => import('./Chat/GlobalChat'));

const ProtectedRoute = ({ isAuth, navigateTo }: { isAuth: boolean; navigateTo: string }) => {
    return isAuth ? <Outlet /> : <Navigate to={navigateTo} />;
};

export const Main: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const isInitialized = useAppSelector(getIsInitialized);
    const id = useAppSelector(getAuthUserId);

    const { initialize } = boundThunks.mainThunks;

    useEffect(() => {
        initialize();
    }, []);

    if (!isInitialized) {
        return <Preloader />;
    }

    return (
        <MainContent>
            <SuspensePreload>
                <Routes>
                    <Route
                        element={<ProtectedRoute isAuth={!isAuth} navigateTo={`/profile/${id}`} />}
                    >
                        <Route path="/" element={<LazyLogin />} />
                    </Route>
                    <Route path="/profile/:userID" element={<LazyProfile />} />
                    <Route path="/users/*" element={<LazyUsers />} />
                    <Route element={<ProtectedRoute isAuth={isAuth} navigateTo="/" />}>
                        <Route path="/dialogs/:friendId?" element={<LazyDialogs />} />
                        <Route path="/chat" element={<LazyChat />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SuspensePreload>
        </MainContent>
    );
};
