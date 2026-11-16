import { Animated, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";

export type IconName = keyof typeof Ionicons.glyphMap;

type ThemeColors = (typeof Colors)[keyof typeof Colors];

interface TabBarItemProps {
    readonly index: number;
    readonly title: string;
    readonly activeIcon: IconName;
    readonly inactiveIcon: IconName;
    readonly focused: boolean;
    readonly position: Animated.AnimatedInterpolation<number>;
    readonly themeColors: ThemeColors;
    readonly onPress: () => void;
}

export function TabBarItem({
    index,
    title,
    activeIcon,
    inactiveIcon,
    focused,
    position,
    themeColors,
    onPress,
}: TabBarItemProps) {
    const activeOpacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
        extrapolate: "clamp",
    });

    const inactiveOpacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
    });

    const bubbleOpacity = position.interpolate({
        inputRange: [index - 0.15, index, index + 0.15],
        outputRange: [0, 1, 0],
        extrapolate: "clamp",
    });

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            style={styles.item}
        >
            <Animated.View style={styles.iconBox}>
                {/* Burbuja de selección */}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.bubble,
                        {
                            backgroundColor: themeColors.primary + "20",
                            opacity: bubbleOpacity,
                        },
                    ]}
                />
                {/* Icono inactivo */}
                <Animated.View style={[styles.iconLayer, { opacity: inactiveOpacity }]}>
                    <Ionicons name={inactiveIcon} size={24} color={themeColors.tabIconDefault} />
                </Animated.View>
                {/* Icono activo */}
                <Animated.View style={[styles.iconLayer, { opacity: activeOpacity }]}>
                    <Ionicons name={activeIcon} size={24} color={themeColors.tabIconSelected} />
                </Animated.View>
            </Animated.View>

            <View style={styles.labelBox}>
                <Animated.Text
                    style={{
                        color: themeColors.tabIconDefault,
                        fontSize: 11,
                    }}
                >
                    {title}
                </Animated.Text>

                <Animated.Text
                    style={{
                        position: "absolute",
                        color: themeColors.tabIconSelected,
                        fontSize: 11,
                        opacity: activeOpacity,
                    }}
                >
                    {title}
                </Animated.Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
});