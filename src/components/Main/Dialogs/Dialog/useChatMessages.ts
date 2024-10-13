import React, { useEffect, useState } from 'react';
import {
    TransformedMessage,
    useGetMessagesQuery,
    useGetOlderMessagesQuery,
    useSendMessageMutation
} from '../../../../api/dialogsAPI.ts';

export const useChatMessages = (userId: number) => {
    // To preload old messages, we store the last loaded page
    const [page, setPage] = useState(1);

    // Container to all messages like new and old
    let [chatMessages, setChatMessages] = useState<TransformedMessage[]>([]);

    const { data: oldMessages, isFetching: isFetchingOldMessages } = useGetOlderMessagesQuery({
        userId,
        page,
        count: 20
    });

    const [sendMessage, { isLoading: isMessageSending }] = useSendMessageMutation();

    // Periodically fetches the latest messages every 10 seconds using polling
    const { data: messages, isSuccess, isError } = useGetMessagesQuery({ userId, count: 20 }, { pollingInterval: 5000 });

    // Manually reset old messages to avoid component flickering
    // Clear the chat messages state as the component does not rerender automatically
    // This helps prevent the immediate disappearance and reappearance of new data
    // If we don't want to use this effect, we need to add a key to the Dialog component
    useEffect(() => {
        setChatMessages([]);
        chatMessages = [];
        setPage(1);
    }, [userId]);

    // Add old messages
    useEffect(() => {
        if (messages) {
            // Find only old messages
            const newMessages: TransformedMessage[] = messages.items.filter((message) => (
                !chatMessages.find((m) => m.id === message.id)
            ));

            setChatMessages([...chatMessages, ...newMessages]);
        }
    }, [messages]);


    // Add new messages
    useEffect(() => {
        if (oldMessages && page !== 1) {
            setChatMessages([ ...oldMessages.items, ...chatMessages, ]);
        }
    }, [oldMessages]);



    // Fetching more old messages when scroll almost equal to element scroll height
    // and after when the newest messages loaded
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.scrollTop < 300
            && isSuccess
            && !isFetchingOldMessages
            && (oldMessages?.totalCount || 0) > page * 20) {

            setPage((prevPage) => prevPage + 1);
        }
    };


    const handleSendMessage = (newMessage: string) => {
        sendMessage({ body: newMessage, userId: userId});
    };

    return {
        chatMessages,
        isSuccess,
        isError,
        isMessageSending,
        handleScroll,
        handleSendMessage
    };
};