import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type Theme = "light" | "dark";

export function homeStyles(theme: Theme) {
    const colors = Colors[theme];

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        scroll: {
            flex: 1,
        },
        content: {
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 16,
            gap: 20,
        },
        title: {
            fontSize: 26,
            fontWeight: "700",
            color: colors.text,
        },
        subtitle: {
            fontSize: 13,
            fontWeight: "500",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: colors.tabIconDefault,
        },
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 14,
        },
        card: {
            width: "48%",
            aspectRatio: 1,
            padding: 16,
            borderRadius: 20,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "space-between",
        },
        cardPressed: {
            opacity: 0.85,
            transform: [{ scale: 0.98 }],
        },
        cardTop: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "transparent",
        },
        cardIcon: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.primary + "18",
            alignItems: "center",
            justifyContent: "center",
        },
        cardInfo: {
            gap: 4,
            backgroundColor: "transparent",
        },
        cardTitle: {
            fontSize: 17,
            fontWeight: "700",
            color: colors.text,
        },
        cardSubtitle: {
            fontSize: 12,
            color: colors.tabIconDefault,
        },
        addBar: {
            minHeight: 58,
            borderRadius: 18,
            backgroundColor: colors.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
        },
        addBarPressed: {
            opacity: 0.9,
        },
        addBarText: {
            fontSize: 16,
            fontWeight: "700",
            color: "#FFFFFF",
        },
        footer: {
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
        },
    });
}