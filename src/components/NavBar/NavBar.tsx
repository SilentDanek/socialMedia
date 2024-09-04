import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";
import { FC } from "react";
import { useAppSelector, getAuthUserId, getAuthStatus } from "../../redux/";


export const NavBar: FC = () => {
    const id = useAppSelector(getAuthUserId);
    const isAuth = useAppSelector(getAuthStatus);

    function active({ isActive }: { isActive: boolean }) {
        return isActive ? { color: "#d1c324" } : {};
    }

    return (
        <nav className={s.nav}>
            <ul>
                <li>
                    <NavLink to={`/profile/${id}`} style={active}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/dialogs"} style={active}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/news"} style={active}>
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/music"} style={active}>
                        Music
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/users"} style={active}>
                        Find users
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/settings"} style={active}>
                        Settings
                    </NavLink>
                </li>
                {!isAuth && <li>
                    <NavLink to={"/login"} style={active}>
                        Login
                    </NavLink>
                </li>
                }
            </ul>
        </nav>
    );
};