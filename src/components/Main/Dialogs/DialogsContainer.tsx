import {compose} from "redux";
import {ComponentType} from "react";
import {connect} from "react-redux";
import {IState} from "../../../interfaces/IState";
import {Dialogs} from "./Dialogs";
import {sendMessage} from "../../../redux/reducers/dialogsReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";


const mapStateToProps = (state:IState) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect
)(Dialogs);