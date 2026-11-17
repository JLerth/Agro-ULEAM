import { Pressable, StyleSheet, Animated } from "react-native";
import { Moon, Sun, Bell } from "lucide-react-native";

import { View, Text } from "@/components/Themed";
import { useColorScheme, useToggleTheme } from "@/components/useColorScheme";

type HeaderItem = {
    readonly subtitle: string;
    readonly title: string;
};

type AppHeaderProps = {
    readonly items: HeaderItem[];
    readonly position: Animated.Value;
};

export default function AppHeader({ items, position }: AppHeaderProps) {
    const colorScheme = useColorScheme();
    const toggleTheme = useToggleTheme();

    const isDark = colorScheme === "dark";

    return (
        <View colorName="primary" style={styles.container}>
            <View
                colorName="primary"
                style={styles.titleContainer}
            >
                {items.map((item, index) => {
                    const opacity = position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={item.title}
                            pointerEvents="none"
                            style={[
                                styles.animatedTitle,
                                { opacity },
                            ]}
                        >
                            <Text
                                lightColor="#FFFFFF"
                                darkColor="#FFFFFF"
                                style={styles.subtitle}
                            >
                                {item.subtitle}
                            </Text>

                            <Text
                                lightColor="#FFFFFF"
                                darkColor="#FFFFFF"
                                style={styles.title}
                            >
                                {item.title}
                            </Text>
                        </Animated.View>
                    );
                })}
            </View>

            <View
                colorName="primary"
                style={styles.themeButton}
            >
                <Bell color="#FFFFFF" size={26} />

                <Pressable
                    onPress={toggleTheme}
                    accessibilityRole="button"
                    accessibilityLabel={
                        isDark ? "Activar modo claro" : "Activar modo oscuro"
                    }
                    hitSlop={10}
                >
                    {isDark ? (
                        <Sun color="#FFFFFF" size={26} />
                    ) : (
                        <Moon color="#FFFFFF" size={26} />
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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