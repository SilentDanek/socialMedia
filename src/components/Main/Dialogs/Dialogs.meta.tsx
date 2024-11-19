import { FC, memo } from 'react';
import { Helmet } from 'react-helmet-async';

export const DialogsMeta: FC = memo(() => {
    return (
        <Helmet>
            <title>Dialogs - Social Network</title>
            <meta
                name="description"
                content="Manage your private conversations and connect with users in the Social Network. View all your chats in one place."
            />
            <meta
                name="keywords"
                content="dialogs, private messages, chats, conversations, social network, connect"
            />
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
});
