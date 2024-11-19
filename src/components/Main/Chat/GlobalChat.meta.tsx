import { Helmet } from 'react-helmet-async';

export const GlobalChatMeta = () => {
    return (
        <Helmet>
            <title>Global chat</title>
            <meta
                name="description"
                content="Join the global chat to connect with users from around the world. Share your thoughts, make new friends, and enjoy the conversation."
            />
            <meta
                name="keywords"
                content="global chat, social network, online messaging, live chat, connect with people"
            />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="Global Chat - Social Network" />
            <meta
                property="og:description"
                content="Join the global chat to connect with users from around the world. Share your thoughts, make new friends, and enjoy the conversation."
            />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};
