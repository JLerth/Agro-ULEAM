import { StyleSheet } from "react-native";

export function headerStyles() {
    return StyleSheet.create({
        container: {
            borderRadius: 18,
            // borderBottomLeftRadius: 18,
            // borderBottomRightRadius: 18,
            paddingHorizontal: 20,
            paddingVertical: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        titleContainer: {
            flex: 1,
            height: 46,
            position: "relative",
            justifyContent: "center",
        },
        animatedTitle: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
        },
        subtitle: {
            fontSize: 13,
            fontWeight: "400",
        },
        title: {
            fontSize: 22,
            fontWeight: "700",
        },
        themeButton: {
            flexDirection: "row",
            width: 90,
            height: 42,
            borderRadius: 21,
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
        },
    });
}