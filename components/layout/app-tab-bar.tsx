import { useEffect, type ComponentProps } from "react";
import { router, useSegments } from "expo-router";
import { Animated } from "react-native";
import type { TopTabs } from "expo-router/js-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { tabBarStyles as styles } from "@/styles/tab-bar.styles";

import { TabBarItem, type IconName } from "./tab-bar";

type TabBarRenderer = NonNullable<ComponentProps<typeof TopTabs>["tabBar"]>;
export type TabBarProps = Parameters<TabBarRenderer>[0];

const ICONS: Record<string, [IconName, IconName] | undefined> = {
    "(inicio)": ["home", "home-outline"],
    weather: ["cloud", "cloud-outline"],
    dashboard: ["leaf", "leaf-outline"],
    config: ["settings", "settings-outline"],
};

const FALLBACK_ICONS: [IconName, IconName] = ["ellipse", "ellipse-outline"];

type AppTabBarProps = Readonly<TabBarProps & {
    headerPosition: Animated.Value;
}>;

export function AppTabBar({
    state,
    descriptors,
    emitter,
    navigateToTab,
    position,
    headerPosition,
}: AppTabBarProps) {
    const theme = useColorScheme();
    const themeColors = Colors[theme];

    const segments = useSegments();
    const isGestionScreen =
        (segments as readonly string[]).includes("gestion") ||
        (segments as readonly string[]).includes("detalle");

    useEffect(() => {
        headerPosition.setValue(state.index);

        const listenerId = position.addListener(({ value }) => {
            headerPosition.setValue(value);
        });

        return () => {
            position.removeListener(listenerId);
        };
    }, [position, headerPosition, state.index]);

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{ backgroundColor: themeColors.surface }}
        >

            <View
                style={[
                    styles.bar,
                    {
                        backgroundColor: themeColors.surface,
                        borderTopColor: themeColors.border,
                    },
                ]}
            >
                {state.routes.map((route, index) => {
                    const focused = state.index === index;
                    const options = descriptors[route.key].options;

                    const [activeIcon, inactiveIcon] = ICONS[route.name] ?? FALLBACK_ICONS;

                    const onPress = () => {
                        const event = emitter.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) return;

                        if (route.name === "(inicio)" && focused && isGestionScreen) {
                            router.replace("/(tabs)/(inicio)");
                            return;
                        }

                        if (!focused) {
                            navigateToTab(route.key);
                        }
                    };

                    return (
                        <TabBarItem
                            key={route.key}
                            index={index}
                            title={options.title ?? route.name}
                            activeIcon={activeIcon}
                            inactiveIcon={inactiveIcon}
                            focused={focused}
                            position={position}
                            themeColors={themeColors}
                            onPress={onPress}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
}