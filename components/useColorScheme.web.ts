import { useContext } from "react";
import { ThemeContext } from "./theme-context";

export const useColorScheme = (): "light" | "dark" => {
    const theme = useContext(ThemeContext);

    return theme?.colorScheme ?? "light";
};

export function useToggleTheme(): () => void {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error(
            "useToggleTheme debe utilizarse dentro de ThemeProvider"
        );
    }

    return theme.toggleTheme;
}