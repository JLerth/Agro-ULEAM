import { Tabs, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ColorValue } from "react-native";
import {View} from "@/components/Themed";
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/layout/appheader";

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon =
    (active: IconName, inactive: IconName, primary: string) =>
    ({
        focused,
        color,
        size,
    }: {
        focused: boolean;
        color: ColorValue;
        size: number;
    }) => (
        <View
            style={{
                width: 52,
                height: 32,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                    ? primary + "20"
                    : "transparent",
            }}
        >
            <Ionicons
                name={focused ? active : inactive}
                size={size}
                color={color as string}
            />
        </View>
    );

export default function TabLayout() {
    const theme = useColorScheme();
    const themeColors = Colors[theme];

    const segments = useSegments();
    const currentScreen = segments.at(-1);

    const headerTitles = {
        index: "Agro ULEAM",
        weather: "Clima",
        dashboard: "Panel",
        config: "Configuración",
    };

    const headerSubtitles = {
        index: "Finca Universitaria",
        weather: "Condiciones meteorológicas",
        dashboard: "Seguimiento de la producción",
        config: "Personalización de la aplicación",
    };

    const title =
        headerTitles[currentScreen as keyof typeof headerTitles] ?? "Agro ULEAM";

    const subtitle =
        headerSubtitles[currentScreen as keyof typeof headerSubtitles] ?? "Finca Universitaria";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background, }} edges={["top"]}>
            <View colorName="background" style={styles.container}>
                <View colorName="background" style={styles.header}>
                    <AppHeader
                        subtitle={subtitle}
                        title={title}
                    />
                </View>

                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: Colors[theme].tabIconSelected,
                        tabBarInactiveTintColor: Colors[theme].tabIconDefault,
                        tabBarStyle: {
                            height: 85,
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor: Colors[theme].surface,
                            borderTopColor: Colors[theme].border,
                            borderTopWidth: 1,
                        },
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Inicio",
                            tabBarIcon: tabIcon("home", "home-outline", themeColors.primary),
                        }}
                    />
                    <Tabs.Screen
                        name="weather"
                        options={{
                            title: "Clima",
                            tabBarIcon: tabIcon("cloud", "cloud-outline", themeColors.primary),
                        }}
                    />
                    <Tabs.Screen
                        name="dashboard"
                        options={{
                            title: "Panel",
                            tabBarIcon: tabIcon("leaf", "leaf-outline", themeColors.primary),
                        }}
                    />
                    <Tabs.Screen
                        name="config"
                        options={{
                            title: "Ajustes",
                            tabBarIcon: tabIcon("settings", "settings-outline", themeColors.primary),
                        }}
                    />
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "transparent",
    },
});