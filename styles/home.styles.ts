import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type Theme = "light" | "dark";

export function homeStyles(theme: Theme, isWide: boolean = false) {
    const colors = Colors[theme];
    const horizontalPadding = isWide ? 32 : 16;

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        scroll: {
            flex: 1,
        },
        content: {
            paddingHorizontal: horizontalPadding,
            paddingTop: 16,
            paddingBottom: 16,
            gap: 20,
            width: "100%",
        },
        // title: {
        //     fontSize: 26,
        //     fontWeight: "700",
        //     color: colors.text,
        // },
        subtitle: {
            fontSize: 13,
            fontWeight: "500",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: colors.tabIconDefault,
        },

        // Celular: 2 columnas. Pantalla ancha: 1 columna a todo el ancho.
        grid: isWide
            ? {
                  gap: 12,
              }
            : {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  rowGap: 14,
              },

        card: {
            ...(isWide
                ? {
                      flexDirection: "row" as const,
                      alignItems: "center" as const,
                      gap: 16,
                  }
                : {
                      width: "48%" as const,
                      gap: 16,
                  }),
            padding: 16,
            borderRadius: 20,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
        },
        cardPressed: {
            opacity: 0.85,
            transform: [{ scale: 0.98 }],
        },

        // Solo celular
        cardTop: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "transparent",
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

        // Solo pantalla ancha
        cardTitleWide: {
            flex: 1,
            fontSize: 17,
            fontWeight: "700",
            color: colors.text,
        },

        cardIcon: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.primary + "18",
            alignItems: "center",
            justifyContent: "center",
        },

        footer: {
            paddingHorizontal: horizontalPadding,
            paddingTop: 12,
            paddingBottom: 12,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
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
    });
}