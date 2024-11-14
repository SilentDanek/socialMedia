import './App.scss';
import { useEffect } from 'react';
import { NavBar } from '@components/NavBar';
import { Main } from '@components/Main';
import { Stack } from '@mui/material';

export const App = () => {
    useEffect(() => {
        const eventHandler = (event: PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason);
        };
        window.addEventListener('unhandledrejection', eventHandler);

        return () => window.removeEventListener('unhandledrejection', eventHandler);
    }, [window]);

    return (
        <Stack
            height="100vh"
            sx={{
                flexDirection: {
                    xs: 'column-reverse',
                    sm: 'row'
                }
            }}
        >
            <NavBar />
            <Main />
        </Stack>
    );
};
