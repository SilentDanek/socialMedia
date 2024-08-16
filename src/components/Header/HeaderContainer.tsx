import {Header} from "./Header";
import {connect}   from "react-redux";
import {logout} from "../../redux/reducers/authReduced";
import {IState} from "../../redux/store";

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