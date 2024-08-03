import {useEffect} from "react";
import {connect}   from "react-redux";
import {useParams} from "react-router-dom";
import {IState}    from "../../../interfaces/IState";
import {Preloader} from "../../common/Preloader/Preloader"
import {Profile}   from "./Profile";
import {getUserProfile} from "../../../redux/reducers/profileReducer";



function ProfileContainer(props:any) {
    const params = useParams();
    useEffect(() => {
        props.getUserProfile(params.userID);
    }, []);

    return props.profile? <Profile/>: <Preloader/>;
}

function mapStateToProps(state:IState){
    return {
        profile: state.profilePage.profile,
    }
}


export default connect(mapStateToProps, {getUserProfile})(ProfileContainer);