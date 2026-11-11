import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
    colorScheme: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);