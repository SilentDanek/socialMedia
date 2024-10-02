import { createContext, FC, ReactNode, useContext, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./themes";

const ThemeContext = createContext<{ toggleTheme: () => void, themeMode:string } | undefined>(undefined);

export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useCustomTheme must be used within a CustomThemeProvider");
    }
    return context;
}

export const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
    let themeFromStorage = localStorage.getItem("theme");

    if(!themeFromStorage){
        themeFromStorage = window.matchMedia('(prefers-color-scheme: dark)').matches? "dark": "light";
    }

    const [themeMode, setThemeMode] = useState(themeFromStorage);

    const theme = themeMode === "light" ? lightTheme : darkTheme;

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