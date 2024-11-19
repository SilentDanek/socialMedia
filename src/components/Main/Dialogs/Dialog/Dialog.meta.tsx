import { FC, memo } from 'react';
import { Helmet } from 'react-helmet-async';

//todo notification (title flicking) if user get new messages
export const DialogMeta: FC<DialogProps> = memo(({ userName }) => {
    return (
        <Helmet>
            <title>Chat with {userName} - Social Network</title>
            <meta
                name="description"
                content={`Chat with ${userName} on Social Network. Stay connected and share your thoughts in real time.`}
            />
            <meta
                name="keywords"
                content={`chat, private messages, ${userName}, conversation, social network`}
            />
            <meta name="robots" content="noindex, follow" />
        </Helmet>
    );
});

type DialogProps = {
    userName: string;
};
