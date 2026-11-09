import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ColorValue } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon =
    (active: IconName, inactive: IconName) =>
    ({
        focused,
        color,
        size,
    }: {
        focused: boolean;
        color: ColorValue;
        size: number;
    }) => (
        <Ionicons
            name={focused ? active : inactive}
            size={size}
            color={color as string}
        />
    );

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", tabBarIcon: tabIcon("home", "home-outline") }}
            />
            <Tabs.Screen
                name="weather"
                options={{ title: "Clima", tabBarIcon: tabIcon("cloud", "cloud-outline") }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{ title: "Dashboard", tabBarIcon: tabIcon("leaf", "leaf-outline") }}
            />
            <Tabs.Screen
                name="config"
                options={{ title: "Configuración", tabBarIcon: tabIcon("settings", "settings-outline") }}
            />
        </Tabs>
    );
}