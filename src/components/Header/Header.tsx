import {NavLink} from "react-router-dom";
import s from "./Header.module.css"

function Header() {
    return (
        <header>
            <NavLink to={"/"} aria-label="Home">
                <img
                    className={s.logoImg}
                    src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_640.png"
                    alt="Aviary logo"
                    height={"100%"}/>
            </NavLink>
        </header>
    )
}

export default Header;