import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector, getAuthStatus} from "../redux";

// Типизация возвращаемого значения
export const useAuthRedirect = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);
};