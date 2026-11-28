import { Animated, Pressable } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { tabBarStyles as styles } from "@/styles/tab-bar.styles";

type ThemeColors = (typeof Colors)[keyof typeof Colors];

interface TabBarItemProps {
    readonly index: number;
    readonly title: string;
    readonly icon: LucideIcon;
    readonly focused: boolean;
    readonly position: Animated.AnimatedInterpolation<number>;
    readonly themeColors: ThemeColors;
    readonly onPress: () => void;
}

export function TabBarItem({
    index,
    title,
    icon: Icon,
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
                    <Icon
                        size={24}
                        strokeWidth={1.75}
                        color={themeColors.tabIconDefault}
                    />
                </Animated.View>
                {/* Icono activo */}
                <Animated.View style={[styles.iconLayer, { opacity: activeOpacity }]}>
                    <Icon
                        size={24}
                        strokeWidth={2.25}
                        color={themeColors.tabIconSelected}
                    />
                </Animated.View>
            </Animated.View>

            <View style={styles.labelBox}>
                <Animated.Text
                    style={[
                        styles.label,
                        { color: themeColors.tabIconDefault },
                    ]}
                >
                    {title}
                </Animated.Text>

                <Animated.Text
                    style={[
                        styles.activeLabel,
                        {
                            color: themeColors.tabIconSelected,
                            opacity: activeOpacity,
                        },
                    ]}
                >
                    {title}
                </Animated.Text>
            </View>
        </Pressable>
    );
}