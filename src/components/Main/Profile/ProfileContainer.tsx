import {ComponentType, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {Profile} from "./Profile";
import {getStatus, requestUserProfile, updateStatus} from "../../../redux/reducers/profileReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux"
import {getAuthStatus, getAuthUserId} from "../../../redux/selectors/authSelectors";
import {getUserProfile, getUserStatus} from "../../../redux/selectors/profileSelectors";
import {IState} from "../../../redux/store";

function ProfileContainer({authUserId, ...props}: any): JSX.Element {
    const params = useParams();

    useEffect(() => {
        const userId = Number(params.userID || authUserId);
        props.requestUserProfile(userId);
        props.getStatus(userId);
    },[params.userID, authUserId]);

    return <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>;
}

function mapStateToProps(state:IState){
    return {
        profile: getUserProfile(state),
        status : getUserStatus(state),
        isAuth : getAuthStatus(state),
        authUserId : getAuthUserId(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {requestUserProfile, getStatus, updateStatus}),
    withAuthRedirect)(ProfileContainer);