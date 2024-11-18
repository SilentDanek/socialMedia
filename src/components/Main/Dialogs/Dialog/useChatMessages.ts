import React, { useEffect, useState } from 'react';
import {
    TransformedMessage,
    useGetMessagesQuery,
    useGetOlderMessagesQuery,
    useSendMessageMutation
} from '@api/dialogsAPI.ts';

export const useChatMessages = (userId: number) => {
    // To preload old messages, we store the last loaded page
    const [page, setPage] = useState(1);
    const [isLoadedDialog, setIsLoadedDialog] = useState(false);

    // Container for all new and old messages
    // eslint-disable-next-line prefer-const
    let [chatMessages, setChatMessages] = useState<TransformedMessage[]>([]);

    const { data: oldMessages, isFetching: isFetchingOldMessages } = useGetOlderMessagesQuery({
        userId,
        page,
        count: 20
    });

    const [sendMessage, { isLoading: isMessageSending }] = useSendMessageMutation();

    // Periodically fetches the latest messages every 5 seconds using polling
    const {
        data: messages,
        isFetching,
        isError
    } = useGetMessagesQuery(
        {
            userId,
            count: 20
        },
        { pollingInterval: 5000 }
    );

    if (!isLoadedDialog && !isFetching) {
        setIsLoadedDialog(true);
    }

    // Manually reset old messages to avoid component flickering
    // Clear the chat messages state as the component does not rerender automatically
    // This helps prevent the immediate disappearance and reappearance of new data
    // If we don't want to use this effect, we need to remove a key to the Dialog component
    useEffect(() => {
        setChatMessages([]);
        setPage(1);
        setIsLoadedDialog(false);
        chatMessages = [];
    }, [userId]);

    // Add new messages
    useEffect(() => {
        if (messages) {
            // Find index where new messages equal to chatMessages and have actual info
            const index = chatMessages.findIndex((message) =>
                messages.items.some((m) => m.id === message.id)
            );

            // Cut messages witch don't contain in new messages
            const oldActualMessages = chatMessages.slice(0, index);
            setChatMessages([...oldActualMessages, ...messages.items]);
        }
    }, [messages]);

    // Add new messages
    useEffect(() => {
        if (oldMessages && page !== 1) {
            setChatMessages([...oldMessages.items, ...chatMessages]);
        }
    }, [oldMessages]);

    // Fetching more old messages when scroll almost equal to element scroll height
    // and after when the newest messages loaded
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (
            target.scrollTop < 400 &&
            !isFetchingOldMessages &&
            (oldMessages?.totalCount || 0) > page * 20
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleSendMessage = (newMessage: string) => {
        sendMessage({ body: newMessage, userId: userId });
    };

    return {
        chatMessages,
        isLoadedDialog,
        isError,
        isMessageSending,
        handleScroll,
        handleSendMessage
    };
};
