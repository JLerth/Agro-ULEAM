import { useRef, useEffect, useState, useMemo } from "react";
import { Animated } from "react-native";
import { useSegments } from "expo-router";
import { TopTabs } from "expo-router/js-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/layout/appheader";
import {
    HEADER_ITEMS,
    GESTION_HEADERS,
    DETAIL_HEADERS,
    type ScreenHeader,
} from "@/components/layout/screenheaders";
import { AppTabBar, type TabBarProps, } from "@/components/layout/app-tab-bar";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { layoutStyles } from "@/styles/layout.styles";

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

    const styles = useMemo(
        () => layoutStyles(theme),
        [theme]
    );
    const segments = useSegments();

    const isGestionScreen =
        (segments as readonly string[]).includes("gestion") ||
        (segments as readonly string[]).includes("detalle");

    const currentSegment = (segments as readonly string[]).at(-1);

   const isDetailScreen = (segments as readonly string[]).includes("detalle");

    const gestionHeader = isDetailScreen
        ? DETAIL_HEADERS[currentSegment ?? ""]
        : GESTION_HEADERS[currentSegment ?? ""];

    const [lastGestionHeader, setLastGestionHeader] =
        useState<ScreenHeader | null>(null);

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
            style={styles.root}
            edges={["top"]}
        >
            <View colorName="background" style={styles.container}>
                {!isDetailScreen && (
                    <View colorName="background" style={styles.header}>
                        <AppHeader items={headerItems} position={headerPosition} />
                    </View>
                )}

                <TopTabs
                    tabBarPosition="bottom"
                    tabBar={isDetailScreen ? () => null : tabBar}
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