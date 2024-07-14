import Profile from "./Profile";
import {connect} from "react-redux";
import {useEffect} from "react";
import {IState} from "../../../interfaces/IState";
import {setUserProfile} from "../../../redux/actions/actionCreators/profileActionCreators";
import { toggleIsFetching } from "../../../redux/actions/actionCreators/usersActionCreators";
import {Preloader} from "../../common/Preloader/Preloader"

function ProfileContainer(props:any) {
    useEffect(() => {
        props.toggleIsFetching(true);
        fetch(`http://localhost:5000/profile/1`)
            .then((response) => response.json())
            .then((response) => {
                props.setUserProfile(response);
                props.toggleIsFetching(false);
            });
    }, []);

    return props.profile? <Profile/>: <Preloader/>;
}

function mapStateToProps(state:IState){
    return {
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {setUserProfile, toggleIsFetching})(ProfileContainer);