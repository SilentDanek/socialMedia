import { AddNewMessageForm } from './AddNewMessageForm';
import React, { FC, ReactElement } from 'react';
import { ChatMessages } from './Messages';
import { ChatWrapper } from './Chat.styles.ts';

export const Chat: FC<ChatProps> = ({
    blockSubmitButton,
    sendMessage,
    error,
    messages,
    chatHeader,
    onScroll
}) => {
    return (
        <ChatWrapper onScrollCapture={onScroll}>
            {chatHeader && <header>{chatHeader}</header>}
            <ChatMessages messages={messages} />
            <AddNewMessageForm
                sendMessage={sendMessage}
                blockSubmitButton={blockSubmitButton || !!error}
            />
        </ChatWrapper>
    );
};

type ChatProps = {
    sendMessage: (newMessage: string) => void;
    blockSubmitButton: boolean;
    error?: boolean;
    messages: Message[];
    chatHeader?: ReactElement;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

export type Message = {
    id: string;
    userId: number;
    message: string;
    userName: string;
    photo?: string;

    addedAt?: string;
    viewed?: boolean;
    authUserId?: number | null;
    recipientId?: string;
    translatedBody?: unknown;
};
