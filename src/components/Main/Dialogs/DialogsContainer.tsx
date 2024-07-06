import React from "react";
import {
    createSendMessageAction,
    updateNewMessageBodyAction
} from "../../../redux/actions/actionCreators/dialogsActionCreators";

import Dialogs from "./Dialogs";
import {StoreContext} from "../../../StoreContext";


function DialogsContainer(props: any) {
    return (
        <StoreContext.Consumer>{(store) => {
            if (!store) return;

            const state = store.getState();

            const onSendMessageClick = () => {
                const action = createSendMessageAction();
                store.dispatch(action);
            }

            const onNewMessageChange = (text: string) => {
                const action = updateNewMessageBodyAction(text);
                store.dispatch(action)
            }

            return (
                <Dialogs
                    updateNewMessageBody={onNewMessageChange}
                    sendMessage={onSendMessageClick}
                    dialogsPage={state.dialogsPage}
                />)
        }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;

