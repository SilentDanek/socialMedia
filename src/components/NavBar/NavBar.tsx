import React from "react";
import {NavLink} from "react-router-dom";
import s from "./NavBar.module.css"

function NavBar() {
    return(
        <nav className={s.nav}>
            <ul>
                <li>
                    <NavLink to={"/profile"} aria-label="Profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/messages"} aria-label="Messages">
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/news"} aria-label="News">
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/music"} aria-label="Music">
                        Music
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/settings"} aria-label="Settings">
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;