import { useMemo } from "react";
import { Pressable, Animated } from "react-native";
import { Moon, Sun, Bell } from "lucide-react-native";

import { View, Text } from "@/components/Themed";
import { useColorScheme, useToggleTheme } from "@/components/useColorScheme";
import { headerStyles } from "@/styles/header.styles";

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

    const styles = useMemo(
        () => headerStyles(),
        []
    );

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