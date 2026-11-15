import { useRef, useState } from "react";
import type { ComponentRef } from "react";
import { useNavigation } from "expo-router";
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

    const cardBackground = useThemeColor({}, "surface");
    const borderColor = useThemeColor({}, "border");
    const textColor = useThemeColor({}, "text");

    const secondaryTextColor = useThemeColor(
        { light: "#648071", dark: "#A5B7AA" },
        "text"
    );

    const categoryTextColor = useThemeColor({}, "primary");
    const accentColor = useThemeColor({}, "primary");

    const softBackground = useThemeColor(
        { light: "#F0F6F1", dark: "#20352A" },
        "surface"
    );

    const todayBackground = useThemeColor(
        { light: "#EAF4EE", dark: "#294936" },
        "surface"
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

    const navigation = useNavigation();

    const handleHourlyTouchStart = () => {
        navigation.setOptions({ swipeEnabled: false });
    };

    const handleHourlyTouchEnd = () => {
        navigation.setOptions({ swipeEnabled: true });
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
                            accessibilityLabel="Retroceder pronóstico"
                            style={[
                                styles.scrollButton,
                                { backgroundColor: softBackground },
                            ]}
                        >
                            <ChevronLeft size={18} color={secondaryTextColor} />
                        </Pressable>

                        <Pressable
                            onPress={() => scrollHourly("right")}
                            accessibilityLabel="Avanzar pronóstico"
                            style={[
                                styles.scrollButton,
                                { backgroundColor: softBackground },
                            ]}
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
                    onTouchStart={handleHourlyTouchStart}
                    onTouchEnd={handleHourlyTouchEnd}
                    onTouchCancel={handleHourlyTouchEnd}
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
                                    {
                                        backgroundColor: hour.isCurrentHour
                                            ? todayBackground
                                            : softBackground,
                                        borderColor: hour.isCurrentHour
                                            ? accentColor
                                            : borderColor,
                                    },
                                hour.isCurrentHour && styles.dailyCardToday,
                            ]}
                        >
                            <View style={styles.forecastMetric}>
                                <Text
                                    style={[
                                        styles.forecastValue,
                                        {
                                            color: hour.isCurrentHour ? accentColor : textColor,
                                        },
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
                                <Text style={[styles.forecastValue, { color: textColor }]}>
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
                    onTouchStart={handleHourlyTouchStart}
                    onTouchEnd={handleHourlyTouchEnd}
                    onTouchCancel={handleHourlyTouchEnd}
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
                                    {
                                        backgroundColor: day.isToday
                                            ? todayBackground
                                            : cardBackground,
                                        borderColor: day.isToday
                                            ? accentColor
                                            : borderColor,
                                    },
                                day.isToday && styles.dailyCardToday,
                            ]}
                        >
                            {/* Día de la semana */}
                            <Text
                                style={[
                                    styles.forecastValue,
                                    {
                                        color: day.isToday ? accentColor : textColor,
                                    },
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
                            <Text style={[styles.dailyTemperature, { color: textColor }]}>
                                {day.metrics.find(
                                    (metric) => metric.id === "maximum"
                                )?.value}
                            </Text>

                            <Text style={[styles.dailyMinimum, { color: secondaryTextColor }]}>
                                {day.metrics.find(
                                    (metric) => metric.id === "minimum"
                                )?.value}
                            </Text>

                            {/* Precipitación diurna y nocturna */}
                            <View style={styles.dailyPrecipitation}>
                                <Text style={[styles.precipitationValue, { color: secondaryTextColor }]}>
                                    ☀ {day.metrics.find(
                                        (metric) => metric.id === "day-precipitation"
                                    )?.value}
                                </Text>

                                <Text style={[styles.precipitationValue, { color: secondaryTextColor }]}>
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