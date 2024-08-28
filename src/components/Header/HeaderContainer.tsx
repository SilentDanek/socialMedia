import {Header} from "./Header";
import {useAppSelector} from "../../redux/store";
import {logout} from "../../redux/ducks/auth/thunks";
import {getAuthStatus, getLogin} from "../../redux/ducks/auth/selectors";
import {useActions} from "../../hooks/useActions";


export const HeaderContainer = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const login  = useAppSelector(getLogin);

    const [logoutD] = useActions([logout])

    return <Header isAuth={isAuth} login={login} logout={logoutD}/>;
}