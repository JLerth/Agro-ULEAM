import { useMemo } from "react";
import { router } from "expo-router";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";
import { ChevronRight, CirclePlus } from "lucide-react-native";

import { MODULE_LIST } from "@/constants/modules";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { homeStyles } from "@/styles/home.styles";

const WIDE_BREAKPOINT = 600;

export default function HomeScreen() {
    const theme = useColorScheme();
    const colors = Colors[theme];
    const { width } = useWindowDimensions();
    const isWide = width >= WIDE_BREAKPOINT;

    const styles = useMemo(() => homeStyles(theme, isWide), [theme, isWide]);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {/* <Text style={styles.title}>Inicio</Text> */}
                    <Text style={styles.subtitle}>Gestión agropecuaria</Text>
                </View>

                <View style={styles.grid}>
                    {MODULE_LIST.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Pressable
                                key={item.key}
                                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                                onPress={() => router.push(item.route)}
                                accessibilityRole="button"
                                accessibilityLabel={item.name}
                            >
                                {isWide ? (
                                    <>
                                        <View style={styles.cardIcon}>
                                            <Icon size={28} color={colors.primary} />
                                        </View>
                                        <Text style={styles.cardTitleWide}>{item.name}</Text>
                                        <ChevronRight size={20} color={colors.tabIconDefault} />
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.cardTop}>
                                            <View style={styles.cardIcon}>
                                                <Icon size={28} color={colors.primary} />
                                            </View>
                                            <ChevronRight size={20} color={colors.tabIconDefault} />
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardTitle}>{item.name}</Text>
                                        </View>
                                    </>
                                )}
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.addBar,
                        pressed && styles.addBarPressed,
                    ]}
                    onPress={() => {}}
                    accessibilityRole="button"
                    accessibilityLabel="Agregar"
                >
                    <CirclePlus size={24} color="#FFFFFF" />
                    <Text style={styles.addBarText}>Agregar</Text>
                </Pressable>
            </View>
        </View>
    );
}