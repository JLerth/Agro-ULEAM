
import { Text, View, useThemeColor } from "@/components/Themed";
import { weatherStyles as styles } from "@/features/weather/styles/weather.styles";
import { LastConnectionWarning } from "@/features/weather/components/last-connection-warning";

interface WeatherMetric {
    readonly id: string;
    readonly label: string;
    readonly value: string | number;
}

interface WeatherMetricSectionProps {
    readonly data: {
        readonly title: string;
        readonly metrics: readonly WeatherMetric[];
    };
    readonly showLastConnectionWarning: boolean;
}

export function WeatherMetricSection({
    data,
    showLastConnectionWarning,
}: WeatherMetricSectionProps) {
    // Colores del tema
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

    return (
        <View
            style={[
                styles.forecastSection,
                {
                    backgroundColor: cardBackground,
                    borderColor,
                },
            ]}
        >
            {/* Encabezado */}
            <View
                style={[
                    styles.forecastHeader,
                    { backgroundColor: "transparent" },
                ]}
            >
                <View
                    style={[
                        styles.forecastHeaderText,
                        { backgroundColor: "transparent" },
                    ]}
                >
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: textColor },
                        ]}
                    >
                        {data.title}
                    </Text>
                </View>
            </View>

            {/* Advertencia de conexión */}
            <LastConnectionWarning
                visible={showLastConnectionWarning}
            />

            {/* Métricas */}
            <View
                style={[
                    styles.forecastGroup,
                    { backgroundColor: "transparent" },
                ]}
            >
                <View
                    style={[
                        styles.metricsGrid,
                        { backgroundColor: "transparent" },
                    ]}
                >
                    {data.metrics.map((metric) => (
                        <View
                            key={metric.id}
                            style={[
                                styles.metricCard,
                                { backgroundColor: metricBackground },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.metricLabel,
                                    { color: secondaryTextColor },
                                ]}
                            >
                                {metric.label}
                            </Text>

                            <Text
                                style={[
                                    styles.metricValue,
                                    { color: textColor },
                                ]}
                            >
                                {metric.value}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}