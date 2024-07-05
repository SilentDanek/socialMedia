import React from "react";
import {createSendMessageAction, updateNewMessageBodyAction} from "../../../redux/actions/actionCreators/dialogsActionCreators";
import Dialogs from "./Dialogs";


function DialogsContainer(props:any){
    const state = props.store.getState();

    function onSendMessageClick(){
        const action = createSendMessageAction();
        props.store.dispatch(action);
    }

    function onNewMessageChange(text:string){
        const action = updateNewMessageBodyAction(text);
        props.store.dispatch(action)
    }

    return(
        <Dialogs
            updateNewMessageBody = {onNewMessageChange}
            sendMessage = {onSendMessageClick}
            dialogsPage = {state.dialogsPage}
        />
    )
}

export default DialogsContainer;