import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {IState} from "../../../interfaces/IState";
import {
    updateNewMessageBody,
    sendMessage
} from "../../../redux/reducers/dialogsReducer";

const mapStateToProps = (state:IState) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const DialogsContainer = connect(mapStateToProps, {updateNewMessageBody, sendMessage})(Dialogs);

export default DialogsContainer;