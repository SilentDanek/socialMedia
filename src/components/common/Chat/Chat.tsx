import { Stack } from '@mui/material';
import { AddNewMessageForm } from './AddNewMessageForm';
import React, { FC, ReactElement } from 'react';
import { ChatMessages } from './Messages';

export const Chat: FC<ChatProps> = ({
    blockSubmitButton,
    sendMessage,
    error,
    messages,
    chatHeader,
    onScroll
}) => {
    return (
        <Stack
            flexDirection="column"
            height="100%"
            onScrollCapture={onScroll}
            sx={{ maxWidth: 1000, width: '100%', margin: 'auto' }}
        >
            {chatHeader}

            <ChatMessages messages={messages} />
            <AddNewMessageForm
                sendMessage={sendMessage}
                blockSubmitButton={blockSubmitButton || !!error}
            />
        </Stack>
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
