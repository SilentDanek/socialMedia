import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";

const ThemeContext = createContext<{ toggleTheme: () => void, themeMode:string } | undefined>(undefined);

export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useCustomTheme must be used within a CustomThemeProvider");
    }
    return context;
}

export const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState("");

    // The backend does not store the user's theme preference.
    // Therefore, we save the theme choice in localStorage on the client-side.
    // This allows us to maintain the user's theme preference between sessions.
    useEffect(() => setThemeMode(localStorage.getItem("theme") || "light"), []);

    const theme = useMemo(
        () => (themeMode === "light" ? lightTheme : darkTheme),
        [themeMode]
    );

    const toggleTheme = () => {
        const newThemeMode = themeMode === "light" ? "dark" : "light";
        localStorage.setItem("theme", newThemeMode);
        setThemeMode(newThemeMode);
    };


    return (
        <ThemeContext.Provider value={{ toggleTheme, themeMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

type CustomThemeProviderProps = {
    children: ReactNode;
}