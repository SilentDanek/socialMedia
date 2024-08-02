import {useEffect} from "react";
import {connect}   from "react-redux";
import {useParams} from "react-router-dom";
import {IState}    from "../../../interfaces/IState";
import {Preloader} from "../../common/Preloader/Preloader"
import {Profile}   from "./Profile";
import {setUserProfile}   from "../../../redux/reducers/profileReducer";
import {toggleIsFetching} from "../../../redux/reducers/usersReducer";



function ProfileContainer(props:any) {
    const params = useParams();
    useEffect(() => {
        props.toggleIsFetching(true);
        fetch(`https://social-network.samuraijs.com/api/1.0/profile/${params.userID}`)
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