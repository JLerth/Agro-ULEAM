import { StyleSheet, Pressable } from "react-native";
import { Text, View, useThemeColor } from "@/components/Themed";
import { RefreshCw } from "lucide-react-native";

import type { StationDisplayConfig } from "@/features/weather/config/station-display";

interface StationLocationSectionProps {
    readonly stationName: string;
    readonly location: string;
    readonly config: StationDisplayConfig;
    readonly showRetry: boolean;
    readonly onRetry: () => void;
}

export function StationLocationSection({
    stationName,
    location,
    config,
    showRetry,
    onRetry,
}: StationLocationSectionProps) {
    const surfaceColor = useThemeColor({}, "surface");
    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");
    const primaryColor = useThemeColor({}, "primary");
    const retryColor = useThemeColor({}, "primary");

    if (
        !config.showStationName &&
        !config.showLocation &&
        !config.showCustomName
    ) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: surfaceColor,
                    borderColor,
                },
            ]}
        >
            <View style={styles.content}>
                <View style={styles.information}>
                    {config.showCustomName && config.customName.trim() !== "" && (
                        <Text style={[styles.customName, { color: primaryColor }]}>
                            {config.customName}
                        </Text>
                    )}

                    {config.showStationName && (
                        <Text style={[styles.stationName, { color: textColor }]}>
                            {stationName}
                        </Text>
                    )}

                    {config.showLocation && (
                        <Text style={[styles.location, { color: textColor }]}>
                            {location}
                        </Text>
                    )}
                </View>

                {showRetry && (
                    <Pressable
                        onPress={onRetry}
                        style={styles.retryButton}
                        accessibilityRole="button"
                        accessibilityLabel="Reintentar conexión"
                        hitSlop={8}
                    >
                        <RefreshCw size={21} color={retryColor} />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 12,
        padding: 16,
        borderWidth: 1,
        borderRadius: 16,
        gap: 6,
    },
    customName: {
        fontSize: 18,
        fontWeight: "700",
    },
    stationName: {
        fontSize: 15,
        fontWeight: "600",
    },
    location: {
        fontSize: 13,
        opacity: 0.75,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        backgroundColor: "transparent",
    },
    information: {
        flex: 1,
        gap: 6,
        backgroundColor: "transparent",
    },
    retryButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
});