import { Stack } from '@mui/material';
import { AddNewMessageForm } from './AddNewMessageForm/AddNewMessageForm.tsx';
import { FC } from 'react';
import { Messages } from './Messages/Messages.tsx';

export const Chat: FC<ChatProps> = ({ blockSubmitButton, sendMessage, error, messages }) => {
    return (
        <Stack flex={1} flexDirection="column" justifyContent="flex-end" height={'100%'}
               sx={{ maxWidth: 1000, margin: 'auto' }}>
            {error && <div>Some error occurred. Please refresh the page</div>}
            <Messages messages={messages} />
            <AddNewMessageForm sendMessage={sendMessage} blockSubmitButton={blockSubmitButton} />
        </Stack>);
};

type ChatProps = {
    sendMessage: (newMessage: string) => void
    blockSubmitButton: boolean;
    error: boolean;
    messages: Message[]
}

export type Message = {
    id: string
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