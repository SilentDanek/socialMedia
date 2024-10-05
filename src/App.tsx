import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Main } from "./components/Main/Main";
import { Stack } from "@mui/material";
import { CustomThemeProvider } from "./theme";
import './i18n';

// @ts-ignore
window.store = store;

export function App() {
    useEffect(() => {
        const eventHandler = (event: PromiseRejectionEvent) => {
            console.error("Unhandled promise rejection:", event.reason);
        };
        window.addEventListener("unhandledrejection", eventHandler);

        return () => window.removeEventListener("unhandledrejection", eventHandler);
    }, [window]);

    return (
        <CustomThemeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Provider store={store}>
                    <Stack sx={{
                        display: 'flex',
                        height:"100vh",
                        flexDirection: {
                            xs: 'column-reverse', // Изменить направление на column-reverse для экрана xs
                            sm: 'row', // Изменить направление на row для экрана sm и выше
                        },
                    }}>
                        <NavBar />
                        <Main />
                    </Stack>
                </Provider>
            </BrowserRouter>
        </CustomThemeProvider>
    );
}


