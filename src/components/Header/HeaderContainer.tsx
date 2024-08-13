import {Header} from "./Header";
import {connect}   from "react-redux";
import {IState} from "../../interfaces/IState";
import {logout} from "../../redux/reducers/authReduced";

function HeaderContainer(props:any) {
    return (
        <Header {...props}/>
    )
}

const mapStateToProps = (state:IState) => ({
    isAuth: state.auth.isAuth,
    login : state.auth.login
});
export default connect(mapStateToProps, {logout})(HeaderContainer);