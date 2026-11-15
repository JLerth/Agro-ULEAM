import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from "expo-navigation-bar";
import { useContext } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeContext } from "@/components/theme-context";

function RootLayoutContent() {
    const theme = useContext(ThemeContext);

    return (
        <>
            <StatusBar
                style={theme?.colorScheme === "dark" ? "light" : "dark"}
            />
            <NavigationBar
                style={theme?.colorScheme === "dark" ? "dark" : "light"}
            />

            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <RootLayoutContent />
        </ThemeProvider>
    );
}