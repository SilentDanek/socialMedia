import {NavLink} from "react-router-dom";
import s from "./NavBar.module.css"

export function NavBar() {

    function active({isActive}:{isActive:boolean}){
        return isActive? {color: "#d1c324"}: {};
    }

    return(
        <nav className={s.nav}>
            <ul>
                <li>
                    <NavLink to={"/profile"} aria-label="Profile" style={active}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/dialogs"} aria-label="Messages" style={active}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/news"} aria-label="News" style={active}>
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/music"} aria-label="Music" style={active}>
                        Music
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/users"} aria-label="Find users" style={active}>
                        Find users
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/settings"} aria-label="Settings" style={active}>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}