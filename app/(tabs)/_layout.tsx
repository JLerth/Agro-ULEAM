import { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useSegments } from "expo-router";
import { TopTabs } from "expo-router/js-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/layout/appheader";
import { AppTabBar, type TabBarProps, } from "@/components/layout/app-tab-bar";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

const HEADER_ITEMS = [
    {
        title: "Agro ULEAM",
        subtitle: "Finca Universitaria",
    },
    {
        title: "Clima",
        subtitle: "Condiciones meteorológicas",
    },
    {
        title: "Panel",
        subtitle: "Seguimiento de la producción",
    },
    {
        title: "Configuración",
        subtitle: "Personalización de la aplicación",
    },
];

const GESTION_HEADERS: Record<string, { title: string; subtitle: string }> = {
    agro: {
        title: "Agrícola",
        subtitle: "Gestión agrícola",
    },
    pecu: {
        title: "Pecuaria",
        subtitle: "Gestión pecuaria",
    },
    vive: {
        title: "Viveros",
        subtitle: "Gestión viveros",
    },
    inve: {
        title: "Inventario",
        subtitle: "Gestión inventario",
    },
};
const DETAIL_HEADERS: Record<string, { title: string; subtitle: string }> = {
    agro: {
        title: "Detalles",
        subtitle: "Agrícola",
    },
    pecu: {
        title: "Detalles",
        subtitle: "Pecuaria"
    },
    vive: {
        title: "Detalles",
        subtitle: "Viveros",
    },
    insu: {
        title: "Detalles",
        subtitle: "Inventario",
    },
};

function createTabBar(headerPosition: Animated.Value) {
    return (props: TabBarProps) => (
        <AppTabBar
            {...props}
            headerPosition={headerPosition}
        />
    );
}

export default function TabLayout() {
    const theme = useColorScheme();

    const segments = useSegments();

    const isGestionScreen =
        (segments as readonly string[]).includes("gestion") ||
        (segments as readonly string[]).includes("detalle");

    const currentSegment = (segments as readonly string[]).at(-1);

   const isDetailScreen = (segments as readonly string[]).includes("detalle");

    const gestionHeader = isDetailScreen
        ? DETAIL_HEADERS[currentSegment ?? ""]
        : GESTION_HEADERS[currentSegment ?? ""];

    const [lastGestionHeader, setLastGestionHeader] = useState<
        { title: string; subtitle: string } | null
    >(null);

    const isInicioRoot =
    (segments as readonly string[]).includes("(inicio)") &&
    !isGestionScreen;

    useEffect(() => {
        if (gestionHeader) {
            setLastGestionHeader(gestionHeader);
        } else if (isInicioRoot) {
            setLastGestionHeader(null);
        }
    }, [gestionHeader, isInicioRoot]);

    const headerItems = HEADER_ITEMS.map((item, index) => {
        if (index !== 0) return item;

        if (gestionHeader) return gestionHeader;

        if (!isInicioRoot && lastGestionHeader) {
            return lastGestionHeader;
        }

        return item;
    });

    const headerPosition = useRef(new Animated.Value(0)).current;

    const tabBar = createTabBar(headerPosition);

    return (
        <SafeAreaView
            style={[styles.root, { backgroundColor: Colors[theme].background }]}
            edges={["top"]}
        >
            <View colorName="background" style={styles.container}>
                <View colorName="background" style={styles.header}>
                    <AppHeader items={headerItems} position={headerPosition} />
                </View>

                <TopTabs
                    tabBarPosition="bottom"
                    tabBar={tabBar}
                    screenOptions={{
                        swipeEnabled: !isGestionScreen,
                        animationEnabled: false,
                        lazy: false,
                    }}
                >
                    <TopTabs.Screen
                        name="(inicio)"
                        options={{
                            title: "Inicio",
                        }}
                    />
                    <TopTabs.Screen
                        name="weather"
                        options={{
                            title: "Clima",
                        }}
                    />
                    <TopTabs.Screen
                        name="dashboard"
                        options={{
                            title: "Panel",
                        }}
                    />
                    <TopTabs.Screen
                        name="config"
                        options={{
                            title: "Ajustes",
                        }}
                    />
                </TopTabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
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