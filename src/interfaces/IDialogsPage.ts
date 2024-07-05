export interface IDialog {
    id: number;
    name: string;
}

export interface IMessage {
    id: number;
    message: string;
}

export interface IDialogsPage {
    dialogs: IDialog[];
    messages: IMessage[];
    newMessageBody: string;
}
