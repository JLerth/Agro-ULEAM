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
    const [expanded, setExpanded] = useState(true);

    const cardBackground = useThemeColor(
        { light: "#FFFFFF", dark: "#1C2921" },
        "background"
    );

    const metricBackground = useThemeColor(
        { light: "#F8FAFC", dark: "#26372D" },
        "surface"
    );

    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");

    const secondaryTextColor = useThemeColor(
        { light: "#64748B", dark: "#B0BDB3" },
        "text"
    );

    const categoryTextColor = useThemeColor(
        { light: "#374151", dark: "#DCE7DF" },
        "text"
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
                style={styles.quickHeader}
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

                    {data.sections.map((section) => (
                        <View
                            key={section.id}
                            style={styles.metricSection}
                        >
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
                    ))}
                </View>
            )}
        </View>
    );
}