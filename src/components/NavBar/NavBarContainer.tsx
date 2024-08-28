import {NavBar} from "./NavBar";
import {useAppSelector} from "../../redux/store";
import {getAuthUserId} from "../../redux/ducks/auth/selectors";


const NavBarContainer = () =>{
    const id = useAppSelector(getAuthUserId);
    return <NavBar id={id}/>
}

export default NavBarContainer;