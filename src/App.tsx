import './App.scss';
import { store } from './redux';
import { useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { Main } from './components/Main/Main';
import { Stack } from '@mui/material';

declare global {
    interface Window {
        store: typeof store;
    }
}

window.store = store;

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
