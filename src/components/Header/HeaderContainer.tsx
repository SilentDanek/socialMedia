import {Header} from "./Header";
import {useEffect} from "react";
import {connect}   from "react-redux";
import {IState} from "../../interfaces/IState";
import {getAuthUserData} from "../../redux/reducers/authReduced";

function HeaderContainer(props:any) {
    useEffect(()=>{
        props.getAuthUserData();
    },[])

    return (
        <Header {...props}/>
    )
}

const mapStateToProps = (state:IState) => ({
    isAuth: state.auth.isAuth,
    login : state.auth.login
});
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);