import {ComponentType, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {IState} from "../../../interfaces/IState";
import {Profile} from "./Profile";
import {getStatus, getUserProfile, updateStatus} from "../../../redux/reducers/profileReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux"

function ProfileContainer(props: any): JSX.Element {

    const params = useParams();
    useEffect(() => {
        props.getUserProfile(params.userID);
        props.getStatus(params.userID)
    },[]);



    return <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>;
}

function mapStateToProps(state:IState){
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withAuthRedirect)(ProfileContainer);