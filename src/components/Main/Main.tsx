import {Routes, Route} from "react-router-dom"
import s from "./Main.module.css"
import HomePage from "./HomePage/HomePage";
import UsersContainer from "./Users/UsersContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import LoginContainer from "./Login/LoginContainer";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader/Preloader";
import {initialize} from "../../redux/reducers/mainReducer";
import {IState} from "../../redux/store";


function Main({isInitialized,initialize}:any) {
    if(!isInitialized){
        initialize();
        return <Preloader/>;
    }

    return (
        <main className={s.main}>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/dialogs" element = {<DialogsContainer/>}/>
                <Route path="/profile/:userID" element = {<ProfileContainer/>}/>
                <Route path="/users" element = {<UsersContainer/>}/>
                <Route path="/login" element = {<LoginContainer/>}/>
            </Routes>
        </main>
    )
}

const mapStateToProps = (state:IState) => {
    return {
        isInitialized: state.main.isInitialized,
    };
};
export default connect(mapStateToProps,{initialize})(Main);