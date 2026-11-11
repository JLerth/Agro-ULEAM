import { Pressable, StyleSheet } from "react-native";
import { Moon, Sun, Bell } from "lucide-react-native";

import { View, Text } from "@/components/Themed";
import { useColorScheme, useToggleTheme } from "@/components/useColorScheme";

type AppHeaderProps = {
    readonly subtitle: string;
    readonly title: string;
};

export default function AppHeader({ subtitle, title }: AppHeaderProps) {
    const colorScheme = useColorScheme();
    const toggleTheme = useToggleTheme();

    const isDark = colorScheme === "dark";

    return (
        <View colorName="primary" style={styles.container}>
            <View
                lightColor="#246B4A"
                darkColor="#246B4A"
                style={styles.titleContainer}
            >
                <Text
                    lightColor="#FFFFFF"
                    darkColor="#FFFFFF"
                    style={styles.subtitle}
                >
                    {subtitle}
                </Text>

                <Text
                    lightColor="#FFFFFF"
                    darkColor="#FFFFFF"
                    style={styles.title}
                >
                    {title}
                </Text>
            </View>

            <View
                lightColor="#246B4A"
                darkColor="#246B4A"
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
        flexDirection: "column",
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