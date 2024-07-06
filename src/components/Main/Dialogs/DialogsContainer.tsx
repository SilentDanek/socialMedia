import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {IState} from "../../../interfaces/IState";
import {IDispatch} from "../../../interfaces/IDispatch";
import {
    createSendMessageAction,
    updateNewMessageBodyAction
} from "../../../redux/actions/actionCreators/dialogsActionCreators";

const mapStateToProps = (state:IState) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch:IDispatch) => {
    return {
        updateNewMessageBody:(text:string) => {
            const action = updateNewMessageBodyAction(text);
            dispatch(action)
        },
        sendMessage:() => {
            const action = createSendMessageAction();
            dispatch(action);
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

