import {
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

import { ThemeContext, type ThemeMode } from "./theme-context";

interface ThemeProviderProps {
    readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const systemColorScheme = useSystemColorScheme();

    const [colorScheme, setColorScheme] = useState<ThemeMode>(
        systemColorScheme === "dark" ? "dark" : "light"
    );

    const toggleTheme = useCallback(() => {
        setColorScheme((current) =>
            current === "dark" ? "light" : "dark"
        );
    }, []);

    const themeValue = useMemo(
        () => ({
            colorScheme,
            toggleTheme,
        }),
        [colorScheme, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={themeValue}>
            {children}
        </ThemeContext.Provider>
    );
}