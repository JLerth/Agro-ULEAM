import { StyleSheet } from "react-native";

export function createTabBarStyles() {
    return StyleSheet.create({
        // AppTabBar
        bar: {
            height: 85,
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            borderTopWidth: 1,
        },

        // TabBarItem
        item: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        iconBox: {
            width: 52,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        },
        bubble: {
            position: "absolute",
            width: 52,
            height: 32,
            borderRadius: 16,
        },
        iconLayer: {
            position: "absolute",
        },
        labelBox: {
            marginTop: 3,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
        label: {
            fontSize: 11,
        },
        activeLabel: {
            position: "absolute",
            fontSize: 11,
        },
    });
}

export const tabBarStyles = createTabBarStyles();