import { StyleSheet } from "react-native";
import { Text, View, useThemeColor } from "@/components/Themed";

import type { StationDisplayConfig } from "@/features/weather/config/station-display";

interface StationLocationSectionProps {
    readonly stationName: string;
    readonly location: string;
    readonly config: StationDisplayConfig;
}

export function StationLocationSection({
    stationName,
    location,
    config,
}: StationLocationSectionProps) {
    const surfaceColor = useThemeColor({}, "surface");
    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");
    const primaryColor = useThemeColor({}, "primary");

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
});