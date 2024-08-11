import {connect} from "react-redux";
import {Login} from "./Login";
import {login, logout} from "../../../redux/reducers/authReduced";
import {IState} from "../../../interfaces/IState";

export const mapStateToProps = (state:IState) => {
    return {
        isAuth:state.auth.isAuth,
        id: state.auth.id
    };
};

export default connect(mapStateToProps,{login, logout})(Login)