import {ProfileInfo} from "./ProfileInfo";
import {connect} from "react-redux";
import {IState} from "../../../../interfaces/IState";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg"

const mapStateToProps = (state:IState) => {
    if (!state.profilePage || !state.profilePage.profile) return;
    return {
        wallpaperURL: state.profilePage.wallpaperURL,
        photoURL: state.profilePage.profile.photos.large || unknownUserSVG,
        fullName: state.profilePage.profile.fullName
    }
}

export const ProfileInfoContainer = connect(mapStateToProps)(ProfileInfo);