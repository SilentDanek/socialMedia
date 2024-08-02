import {Header} from "./Header";
import {useEffect} from "react";
import {connect}   from "react-redux";
import {IState} from "../../interfaces/IState";
import {setAuthUserData} from "../../redux/reducers/authReduced";

function HeaderContainer(props:any) {
    useEffect(()=>{
        fetch("https://social-network.samuraijs.com/api/1.0/auth/me",{
            credentials: 'include'
        }).then((response => response.json()))
          .then((response) => {
              if(response.resultCode === 0){
                  props.setAuthUserData(response.data)
              }
          })
    },[])

    return (
        <Header {...props}/>
    )
}

const mapStateToProps = (state:IState) => ({
    isAuth: state.auth.isAuth,
    login : state.auth.login
});
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);