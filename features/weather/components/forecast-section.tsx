import { useState } from "react";
import { ScrollView } from "react-native";;
import { Text, View, useThemeColor  } from "@/components/Themed";
import { AccuWeatherIcon } from "@/components/accuweather-icon";
import { weatherStyles as styles } from "@/features/weather/styles/weather.styles";
import { buildForecast } from "@/features/weather/utils/forecast";
import { Sun, Moon, Droplets } from "lucide-react-native";

import { LastConnectionWarning } from "@/features/weather/components/last-connection-warning";

type ForecastData = NonNullable<ReturnType<typeof buildForecast>>;

interface ForecastSectionProps {
    readonly data: ForecastData;
    readonly showLastConnectionWarning: boolean;
}

export function ForecastSection({
    data,
    showLastConnectionWarning,
}: ForecastSectionProps) {
    const [dailyContainerWidth, setDailyContainerWidth] = useState(0);
    const cardBackground = useThemeColor({}, "surface");
    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");

    const secondaryTextColor = useThemeColor(
        { light: "#648071", dark: "#A5B7AA" },
        "text"
    );

    const categoryTextColor = useThemeColor({}, "primary");

    const softBackground = useThemeColor(
        { light: "#F0F6F1", dark: "#20352A" },
        "surface"
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
            <View style={[styles.forecastHeader, { backgroundColor: "transparent" }]}>
                <View style={[styles.forecastHeaderText, { backgroundColor: "transparent"}]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>
                        {data.title}
                    </Text>

                    <Text style={[styles.sectionSubtitle, { color: secondaryTextColor }]}>
                        Weather Forecast by AccuWeather
                    </Text>
                </View>
            </View>

            <LastConnectionWarning
                visible={showLastConnectionWarning}
            />

            {/* Pronóstico de hoy */}
            {data.today && (
                <View style={[ styles.forecastGroup, { backgroundColor: "transparent" },]}>
                    <Text
                        style={[ styles.categoryTitle, { color: categoryTextColor }, ]}>
                        Pronóstico de hoy
                    </Text>

                    <View
                        style={[
                            styles.todayForecastCard,
                            {
                                backgroundColor: softBackground,
                                borderColor,
                            },
                        ]}
                    >
                        <View style={styles.todayForecastMain}>
                            <AccuWeatherIcon
                                icon={data.today.weatherIcon}
                                size={64}
                            />

                            <View style={styles.todayForecastDescription}>
                                <Text
                                    style={[
                                        styles.todayForecastTemperature,
                                        { color: textColor },
                                    ]}
                                >
                                    {data.today.metrics.find(
                                        (metric) => metric.id === "temperature"
                                    )?.value}
                                </Text>

                                <Text
                                    style={[
                                        styles.todayForecastCondition,
                                        { color: secondaryTextColor },
                                    ]}
                                >
                                    {data.today.description}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={[
                                styles.todayForecastTemperatures,
                                { borderTopColor: borderColor },
                            ]}
                        >
                            {/* Temperatura máxima */}
                            <View style={styles.todayForecastMetric}>
                                <Text style={{ color: secondaryTextColor }}>
                                    Máxima
                                </Text>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        { color: textColor },
                                    ]}
                                >
                                    {data.today.metrics.find(
                                        (metric) => metric.id === "maximum"
                                    )?.value}
                                </Text>
                            </View>

                            {/* Temperatura mínima */}
                            <View style={styles.todayForecastMetric}>
                                <Text style={{ color: secondaryTextColor }}>
                                    Mínima
                                </Text>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        { color: textColor },
                                    ]}
                                >
                                    {data.today.metrics.find(
                                        (metric) => metric.id === "minimum"
                                    )?.value}
                                </Text>
                            </View>

                            {/* Precipitación durante el día */}
                            <View style={styles.todayForecastMetric}>
                                <View style={styles.todayForecastMetricIcon}>
                                    <Droplets size={14} color="#4A9BCB" />
                                    <Sun size={16} color="#D69E36" />
                                    <Text style={{ color: secondaryTextColor }}>
                                        Día
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        { color: textColor },
                                    ]}
                                >
                                    {data.today.metrics.find(
                                        (metric) => metric.id === "day-precipitation"
                                    )?.value ?? "--"}
                                </Text>
                            </View>

                            {/* Precipitación durante la noche */}
                            <View style={styles.todayForecastMetric}>
                                <View style={styles.todayForecastMetricIcon}>
                                    <Droplets size={14} color="#4A9BCB" />
                                    <Moon size={16} color="#7C91B5" />
                                    <Text style={{ color: secondaryTextColor }}>
                                        Noche
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        { color: textColor },
                                    ]}
                                >
                                    {data.today.metrics.find(
                                        (metric) => metric.id === "night-precipitation"
                                    )?.value ?? "--"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* Próximos días */}
            {data.daily.length > 0 && (
                <View
                    style={[
                        styles.forecastGroup,
                        { backgroundColor: "transparent" },
                    ]}
                    onLayout={(event) => {
                        setDailyContainerWidth(event.nativeEvent.layout.width);
                    }}
                >
                    <Text
                        style={[
                            styles.categoryTitle,
                            { color: categoryTextColor },
                        ]}
                    >
                        Próximos días
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[
                            styles.dailyForecastList,
                            { minWidth: dailyContainerWidth },
                        ]}
                    >
                        {data.daily.map((day) => (
                            <View
                                key={day.id}
                                style={[
                                    styles.dailyForecastCard,
                                    {
                                        backgroundColor: softBackground,
                                        borderColor,
                                    },
                                ]}
                            >
                                {/* Día y fecha */}
                                <View style={styles.dailyForecastHeader}>
                                    <Text
                                        style={[
                                            styles.dailyForecastWeekday,
                                            { color: textColor },
                                        ]}
                                    >
                                        {day.metrics.find(
                                            (metric) => metric.id === "weekday"
                                        )?.value}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.dailyForecastDate,
                                            { color: secondaryTextColor },
                                        ]}
                                    >
                                        {day.id.slice(8, 10)}
                                    </Text>
                                </View>

                                {/* Icono meteorológico */}
                                <AccuWeatherIcon
                                    icon={day.weatherIcon}
                                    size={44}
                                />

                                {/* Temperaturas */}
                                <View style={styles.dailyForecastTemperatures}>
                                    <Text
                                        style={[
                                            styles.dailyForecastMaximum,
                                            { color: textColor },
                                        ]}
                                    >
                                        {day.metrics.find(
                                            (metric) => metric.id === "maximum"
                                        )?.value}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.dailyForecastMinimum,
                                            { color: secondaryTextColor },
                                        ]}
                                    >
                                        {day.metrics.find(
                                            (metric) => metric.id === "minimum"
                                        )?.value}
                                    </Text>
                                </View>

                                {/* Precipitaciones */}
                                <View style={styles.dailyForecastPrecipitation}>
                                    <View style={styles.dailyForecastPrecipitationItem}>
                                        <Sun size={13} color="#D69E36" />
                                        <Droplets size={13} color="#4A9BCB" />

                                        <Text style={{ color: secondaryTextColor }}>
                                            {day.metrics.find(
                                                (metric) => metric.id === "day-precipitation"
                                            )?.value ?? "--"}
                                        </Text>
                                    </View>

                                    <View style={styles.dailyForecastPrecipitationItem}>
                                        <Moon size={13} color="#7C91B5" />
                                        <Droplets size={13} color="#4A9BCB" />

                                        <Text style={{ color: secondaryTextColor }}>
                                            {day.metrics.find(
                                                (metric) => metric.id === "night-precipitation"
                                            )?.value ?? "--"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}