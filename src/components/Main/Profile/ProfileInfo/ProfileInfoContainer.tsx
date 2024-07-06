import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";
import {IState} from "../../../../interfaces/IState";


const mapStateToProps = (state:IState) => {
    const profileInfo = state.profilePage.profileInfo;
    return {
        avatarURL: profileInfo.avatarURL,
        wallpaperURL: profileInfo.wallpaperURL,
        nickName: profileInfo.nickName,
    }
}

const ProfileInfoContainer = connect(mapStateToProps)(ProfileInfo);

export default ProfileInfoContainer;