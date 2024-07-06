import {StoreContext} from "../../../../StoreContext";
import ProfileInfo from "./ProfileInfo";

function ProfileInfoContainer(props: any) {
    return (
        <StoreContext.Consumer>{
            (store) => {
                if (!store) return;

                const state = store.getState();
                const profileInfo = state.profilePage.profileInfo;

                return (
                    <ProfileInfo
                        avatarURL={profileInfo.avatarURL}
                        wallpaperURL={profileInfo.wallpaperURL}
                        nickName={profileInfo.nickName}
                    />
                )
            }}
        </StoreContext.Consumer>
    );
}

export default ProfileInfoContainer;