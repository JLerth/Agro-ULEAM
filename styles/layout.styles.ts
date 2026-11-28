import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type Theme = "light" | "dark";

export function layoutStyles(theme: Theme) {
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        container: {
            flex: 1,
        },
        header: {
            paddingHorizontal: 8,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: "transparent",
        },
    });
}