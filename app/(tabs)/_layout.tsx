import React, { useRef } from "react";
import { TopTabs } from "expo-router/js-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import {View} from "@/components/Themed";
import { StyleSheet, Pressable, Animated } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/layout/appheader";

type IconName = keyof typeof Ionicons.glyphMap;

function HeaderPositionBridge({
    position,
    target,
    initialIndex,
}: {
    position: Animated.AnimatedInterpolation<number>;
    target: Animated.Value;
    initialIndex: number;
}) {
    React.useEffect(() => {
        target.setValue(initialIndex);

        const listenerId = position.addListener(({ value }) => {
            target.setValue(value);
        });

        return () => {
            position.removeListener(listenerId);
        };
    }, [position, target, initialIndex]);

    return null;
}

export default function TabLayout() {
    const theme = useColorScheme();
    const themeColors = Colors[theme];

    const headerPosition = useRef(new Animated.Value(0)).current;

    const headerItems = [
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background, }} edges={["top"]}>
            <View colorName="background" style={styles.container}>
                <View colorName="background" style={styles.header}>
                    <AppHeader
                        items={headerItems}
                        position={headerPosition}
                    />
                </View>

                <TopTabs
                    tabBarPosition="bottom"
                    screenOptions={{
                        swipeEnabled: true,
                        animationEnabled: false,
                        lazy: false,
                    }}
                    tabBar={({ state, descriptors, emitter, navigateToTab, position }) => {
                        const icons: Record<string, [IconName, IconName]> = {
                            index: ["home", "home-outline"],
                            weather: ["cloud", "cloud-outline"],
                            dashboard: ["leaf", "leaf-outline"],
                            config: ["settings", "settings-outline"],
                        };

                        return (
                            <SafeAreaView
                                edges={["bottom"]}
                                style={{
                                    backgroundColor: themeColors.surface,
                                }}
                            >
                                <HeaderPositionBridge
                                    position={position}
                                    target={headerPosition}
                                    initialIndex={state.index}
                                />
        
                                <View
                                    style={{
                                        height: 85,
                                        flexDirection: "row",
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        backgroundColor: themeColors.surface,
                                        borderTopColor: themeColors.border,
                                        borderTopWidth: 1,
                                    }}
                                >
                                    {state.routes.map((route, index) => {
                                        const focused = state.index === index;
                                        const options = descriptors[route.key].options;

                                        const [activeIcon, inactiveIcon] = icons[route.name];

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

                                        const animatedColor = position.interpolate({
                                            inputRange: [index - 1, index, index + 1],
                                            outputRange: [
                                                themeColors.tabIconDefault,
                                                themeColors.tabIconSelected,
                                                themeColors.tabIconDefault,
                                            ],
                                            extrapolate: "clamp",
                                        });

                                        const animatedBackgroundColor = position.interpolate({
                                            inputRange: [index - 1, index, index + 1],
                                            outputRange: [
                                                "transparent",
                                                themeColors.primary + "20",
                                                "transparent",
                                            ],
                                            extrapolate: "clamp",
                                        });

                                        const onPress = () => {
                                            const event = emitter.emit({
                                                type: "tabPress",
                                                target: route.key,
                                                canPreventDefault: true,
                                            });

                                            if (!focused && !event.defaultPrevented) {
                                                navigateToTab(route.key);
                                            }
                                        };

                                        return (
                                            <Pressable
                                                key={route.key}
                                                onPress={onPress}
                                                accessibilityRole="button"
                                                accessibilityState={{
                                                    selected: focused,
                                                }}
                                                style={{
                                                    flex: 1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Animated.View
                                                    style={{
                                                        width: 52,
                                                        height: 32,
                                                        borderRadius: 16,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        backgroundColor: animatedBackgroundColor,
                                                    }}
                                                >
                                                    <Animated.View style={{ position: "absolute", opacity: inactiveOpacity }}>
                                                        <Ionicons name={inactiveIcon} size={24} color={themeColors.tabIconDefault} />
                                                    </Animated.View>

                                                    <Animated.View style={{ position: "absolute", opacity: activeOpacity }}>
                                                        <Ionicons name={activeIcon} size={24} color={themeColors.tabIconSelected} />
                                                    </Animated.View>
                                                </Animated.View>

                                                <Animated.Text
                                                    style={{
                                                        color: animatedColor,
                                                        fontSize: 11,
                                                        marginTop: 3,
                                                    }}
                                                >
                                                    {options.title ?? route.name}
                                                </Animated.Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </SafeAreaView>
                        );
                    }}
                >
                    <TopTabs.Screen
                        name="index"
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