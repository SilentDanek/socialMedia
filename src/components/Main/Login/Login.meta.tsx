import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Login: FC = () => {
    return (
        <Helmet>
            <title>Sign In - Social Network</title>
            <meta
                name="description"
                content="Sign in to your Social Network account to connect with your friends and explore the platform."
            />
            <meta
                name="keywords"
                content="sign in, login, Social Network, authentication, user account"
            />
            <meta name="robots" content="noindex, nofollow" />

            <meta property="og:title" content="Sign In - Social Network" />
            <meta
                property="og:description"
                content="Log in to your Social Network account and stay connected."
            />
            <meta property="og:image" content="https://example.com/path-to-login-image.jpg" />
            <meta property="og:url" content="https://example.com/login" />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export type LoginFieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError: string;
};

export default Login;
