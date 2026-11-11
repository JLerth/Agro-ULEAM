import { useRef, useState } from "react";
import type { ComponentRef } from "react";
import { Pressable, ScrollView } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

import { Text, View, useThemeColor  } from "@/components/Themed";
import { AccuWeatherIcon } from "@/components/accuweather-icon";
import { weatherStyles as styles } from "@/features/weather/styles/weather.styles";
import { buildForecast } from "@/features/weather/utils/forecast";

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
    const hourlyScrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
    const hourlyScrollPosition = useRef(0);
    const [dailyContainerWidth, setDailyContainerWidth] = useState(0);

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

    const scrollHourly = (direction: "left" | "right") => {
        const distance = 220;

        const nextPosition =
            direction === "right"
                ? hourlyScrollPosition.current + distance
                : Math.max(0, hourlyScrollPosition.current - distance);

        hourlyScrollRef.current?.scrollTo({
            x: nextPosition,
            animated: true,
        });
    };

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

            {/* Pronóstico por horas */}
            <View style={[styles.forecastGroup, { backgroundColor: "transparent" }]}>
                <View  style={[styles.forecastTitleRow, { backgroundColor: "transparent" },]}>
                    <Text style={[styles.categoryTitle, { color: categoryTextColor }]}>
                        Pronóstico por horas
                    </Text>

                    <View style={styles.scrollHint}>
                        <Pressable
                            onPress={() => scrollHourly("left")}
                            style={styles.scrollButton}
                            accessibilityLabel="Retroceder pronóstico"
                        >
                            <ChevronLeft size={18} color={secondaryTextColor} />
                        </Pressable>

                        <Pressable
                            onPress={() => scrollHourly("right")}
                            style={styles.scrollButton}
                            accessibilityLabel="Avanzar pronóstico"
                        >
                            <ChevronRight size={18} color={secondaryTextColor} />
                        </Pressable>
                    </View>
                </View>

                <ScrollView
                    ref={hourlyScrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hourlyList}
                    scrollEventThrottle={16}
                    onScroll={(event) => {
                        hourlyScrollPosition.current =
                            event.nativeEvent.contentOffset.x;
                    }}
                >
                    {data.hourly.map((hour) => (
                        <View
                            key={hour.id}
                            style={[
                                styles.hourlyCard,
                                { backgroundColor: metricBackground },
                                hour.isCurrentHour && styles.dailyCardToday,
                            ]}
                        >
                            <View style={styles.forecastMetric}>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        hour.isCurrentHour && styles.dailyTodayText,
                                    ]}
                                >
                                    {hour.metrics.find(
                                        (metric) => metric.id === "time"
                                    )?.value}
                                </Text>
                            </View>

                            <View style={styles.forecastMetric}>
                                <AccuWeatherIcon
                                    icon={hour.weatherIcon}
                                    size={48}
                                />
                            </View>

                            <View style={styles.forecastMetric}>
                                <Text style={styles.forecastValue}>
                                    {hour.metrics.find(
                                        (metric) => metric.id === "temperature"
                                    )?.value}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Pronóstico diario */}
            <View
                style={[
                    styles.forecastGroup,
                    { backgroundColor: "transparent" },
                ]}
                onLayout={(event) => {
                    setDailyContainerWidth(event.nativeEvent.layout.width);
                }}
            >
                <Text style={[styles.categoryTitle, { color: categoryTextColor }]}>
                    Pronóstico diario
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.dailyList,
                        { minWidth: dailyContainerWidth },
                    ]}
                >
                    {data.daily.map((day) => (
                        <View
                            key={day.id}
                            style={[
                                styles.dailyCard,
                                { backgroundColor: metricBackground },
                                day.isToday && styles.dailyCardToday,
                            ]}
                        >
                            {/* Día de la semana */}
                            <Text
                                style={[
                                    styles.forecastValue,
                                    day.isToday && styles.dailyTodayText,
                                ]}
                            >
                                {day.metrics.find(
                                    (metric) => metric.id === "weekday"
                                )?.value}
                            </Text>

                            {/* Icono meteorológico */}
                            <AccuWeatherIcon
                                icon={day.weatherIcon}
                                size={40}
                            />

                            {/* Temperaturas */}
                            <Text style={styles.dailyTemperature}>
                                {day.metrics.find(
                                    (metric) => metric.id === "maximum"
                                )?.value}
                            </Text>

                            <Text style={styles.dailyMinimum}>
                                {day.metrics.find(
                                    (metric) => metric.id === "minimum"
                                )?.value}
                            </Text>

                            {/* Precipitación diurna y nocturna */}
                            <View style={styles.dailyPrecipitation}>
                                <Text style={styles.precipitationValue}>
                                    ☀ {day.metrics.find(
                                        (metric) => metric.id === "day-precipitation"
                                    )?.value}
                                </Text>

                                <Text style={styles.precipitationValue}>
                                    ☾ {day.metrics.find(
                                        (metric) => metric.id === "night-precipitation"
                                    )?.value}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}