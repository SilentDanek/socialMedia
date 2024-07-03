interface IAction {
    type: string;
    //payload: object;
    payload: {
        text: string;
    };
}

export default IAction;

/*export interface IUpdateNewPostTextAction extends IAction {
    type: ActionTypes.UPDATE_NEW_POST_TEXT,
    payload: {
        text: string;
    };
}

export interface IUpdateNewMessageBodyAction extends IAction {
    type: ActionTypes.UPDATE_NEW_MASSAGE_BODY,
    payload: {
        text: string;
    };
}

export interface ICreateAddPostAction extends IAction {
    type: ActionTypes.ADD_POST,
    payload: {
        text: string;
    };
}*/