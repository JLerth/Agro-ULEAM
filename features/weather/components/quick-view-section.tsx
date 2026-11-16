import { useState } from "react";
import { Pressable } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

import { Text, View, useThemeColor } from "@/components/Themed";
import { weatherStyles as styles } from "@/features/weather/styles/weather.styles";
import { buildQuickView } from "@/features/weather/utils/quick-view";

import { LastConnectionWarning } from "@/features/weather/components/last-connection-warning";

type QuickViewData = NonNullable<ReturnType<typeof buildQuickView>>;

interface QuickViewSectionProps {
    readonly data: QuickViewData;
    readonly showLastConnectionWarning: boolean;
}

export function QuickViewSection({
    data,
    showLastConnectionWarning,
}: QuickViewSectionProps) {
    const [expanded, setExpanded] = useState(false);

    const cardBackground = useThemeColor({}, "surface");
    const headerBackground = useThemeColor(
        { light: "#EAF4EE", dark: "#20352A" },
        "surface"
    );
    const metricBackground = useThemeColor(
        { light: "#F0F6F1", dark: "#20352A" },
        "surface"
    );

    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");
    const secondaryTextColor = useThemeColor(
        { light: "#648071", dark: "#A5B7AA" },
        "text"
    );
    const categoryTextColor = useThemeColor(
        { light: "#176B45", dark: "#3DAD75" },
        "primary"
    );

    const renderSection = (section: QuickViewData["sections"][number]) => (
        <View style={styles.metricSection}>
            <Text style={[styles.categoryTitle, { color: categoryTextColor }]}>
                {section.title}
            </Text>

            <View style={styles.metricsGrid}>
                {section.metrics.map((metric) => (
                    <View
                        key={metric.id}
                        style={[
                            styles.metricCard,
                            { backgroundColor: metricBackground },
                        ]}
                    >
                        <Text style={[styles.metricLabel, { color: secondaryTextColor }]}>
                            {metric.label}
                        </Text>

                        <Text style={[styles.metricValue, { color: textColor }]}>
                            {metric.value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View
            style={[
                styles.quickCard,
                {
                    backgroundColor: cardBackground,
                    borderColor,
                },
            ]}
        >
            <Pressable
                onPress={() => setExpanded((previous) => !previous)}
                accessibilityRole="button"
                accessibilityLabel="Expandir o contraer vista rápida"
                style={[
                    styles.quickHeader,
                    { backgroundColor: headerBackground },
                ]}
            >
                <View style={[styles.quickHeaderText, { backgroundColor: "transparent" }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>
                        {data.title}
                    </Text>

                    <Text style={[styles.sectionSubtitle, { color: secondaryTextColor }]}>
                        Resumen de condiciones meteorológicas
                    </Text>
                </View>

                {expanded ? (
                    <ChevronUp size={22} color={secondaryTextColor} />
                ) : (
                    <ChevronDown size={22} color={secondaryTextColor} />
                )}
            </Pressable>

            {expanded && (
                <View style={styles.quickContent}>
                    <LastConnectionWarning
                        visible={showLastConnectionWarning}
                    />

                    {(() => {
                        const pressure = data.sections.find(
                            (section) => section.id === "pressure"
                        );

                        const humidity = data.sections.find(
                            (section) => section.id === "humidity"
                        );

                        return (
                            <>
                                {data.sections
                                    .filter(
                                        (section) =>
                                            section.id !== "pressure" &&
                                            section.id !== "humidity"
                                    )
                                    .map((section) => (
                                        <View key={section.id}>
                                            {renderSection(section)}
                                        </View>
                                    ))}

                                {pressure && humidity && (
                                    <View style={{ flexDirection: "row", gap: 8 }}>
                                        <View style={{ flex: 1 }}>
                                            {renderSection(pressure)}
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            {renderSection(humidity)}
                                        </View>
                                    </View>
                                )}
                            </>
                        );
                    })()}
                </View>
            )}
        </View>
    );
}