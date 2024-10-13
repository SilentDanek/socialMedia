import { FC } from 'react';
import { getAuthUserId, useAppSelector } from '../../../../redux';
import { useAutoScroll } from '../../../../hooks/useAutoScroll.ts';
import { MessagesWrapper } from './Messages.styles.tsx';
import { TextFieldProps } from '@mui/material';
import { Message } from '../Chat.tsx';
import { ChatMessage } from './Message/Message.tsx';

export const Messages: FC<MessagesProps> = ({ messages }) => {
    const authId = useAppSelector(getAuthUserId);
    const { handleScroll, autoScrollRef } = useAutoScroll(messages);
    return (
        <MessagesWrapper onScroll={handleScroll}>
            {messages.map((m) => (
                <ChatMessage key={m.id} isMessageOwner={authId === m.userId} {...m} />
            ))}
            <div ref={autoScrollRef} />
        </MessagesWrapper>
    );
};

type MessagesProps = { messages: Message[] } & TextFieldProps;