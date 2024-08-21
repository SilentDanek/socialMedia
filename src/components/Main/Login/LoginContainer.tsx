import {connect} from "react-redux";
import {Login} from "./Login";
import {login} from "../../../redux/reducers/authReduced";
import {IState} from "../../../redux/store";
import {getAuthStatus, getAuthUserId, getCaptchaUrl} from "../../../redux/selectors/authSelectors";

export const mapStateToProps = (state:IState) => {
    return {
        isAuth: getAuthStatus(state),
        id:getAuthUserId(state),
        captchaUrl: getCaptchaUrl(state)
    };
};

export default connect(mapStateToProps,{login})(Login)