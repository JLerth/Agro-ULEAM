import { StyleSheet } from "react-native";
import { Moon, Bell } from "lucide-react-native";

import { View, Text } from "@/components/Themed";

type AppHeaderProps = {
    readonly subtitle: string;
    readonly title: string;
};

export default function AppHeader({ subtitle, title }: AppHeaderProps) {
    return (
        <View colorName="primary" style={styles.container}>
            <View lightColor="#246B4A" darkColor="#246B4A" style={styles.titleContainer}>
                <Text lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.subtitle}>
                {subtitle}
                </Text>

                <Text lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.title}>
                {title}
                </Text>
            </View>

            <View
                lightColor="#246B4A"
                darkColor="#246B4A"
                style={styles.themeButton}
            >
                <Bell color="#FFFFFF" size={24} />
                <Moon color="#FFFFFF" size={24} />
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