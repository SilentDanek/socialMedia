import {NavLink} from "react-router-dom";
import s from "./Header.module.css";
import {FC} from "react";

type HeaderProps = {
    isAuth: boolean;
    login: string | null;
    logout: () => any;
}
export const Header:FC<HeaderProps> = ({isAuth, login, logout}) => {
    return (
        <header className={s.header}>
            <NavLink to={"/"} aria-label="Home">
                <img
                    className={s.logoImg}
                    src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_640.png"
                    alt="Aviary logo"
                    height={"100%"}/>
            </NavLink>
            <div>
                {isAuth
                    ? <div>
                        <div>{login}</div>
                        <button onClick={logout}>Log out</button>
                      </div>
                    : <NavLink to={"/login"}>Sign in</NavLink>}
            </div>
        </header>
    )
};