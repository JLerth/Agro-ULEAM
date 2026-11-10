import { useMemo } from "react";
import { Button, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { TriangleExclamationPoint } from 'lucide-react-native';

import { useWeatherData } from "@/features/weather/hooks/use-weather";
import { useAccuWeather } from "@/features/weather/hooks/use-accuweather";

import { buildQuickView } from "@/features/weather/utils/quick-view";
import { buildForecast } from "@/features/weather/utils/forecast";
import { buildWind } from "@/features/weather/utils/wind";
import { buildRainfall } from "@/features/weather/utils/rainfall";
import { buildSunMoon } from "@/features/weather/utils/sun-moon";
import { buildOutdoor } from "@/features/weather/utils/outdoor";
import { buildHumidity } from "@/features/weather/utils/humidity";
import { buildPressure } from "@/features/weather/utils/pressure";

function LastConnectionWarning({ visible }: { readonly visible: boolean }) {
    if (!visible) return null;

    return <Text><TriangleExclamationPoint color="#ffa50a" size={16}/>Datos de la última conexión</Text>;
}

export default function WeatherScreen() {
    // Datos de Ambient Weather
    const {
        currentData,
        historicalData,
        yesterdayData,
        pressureChangeData,
        currentError,
        historicalError,
        yesterdayError,
        pressureChangeError,
        loading: weatherLoading,
        retryFailed: retryWeather,
    } = useWeatherData();

    // Datos de AccuWeather
    const {
        data: sunMoonData,
        dailyData,
        hourlyData,
        loading: forecastLoading,
        error: forecastError,
        retryFailed: retryForecast,
    } = useAccuWeather();

    // 1. Quick View
    const quickSections = useMemo(
        () =>
            currentData
                ? buildQuickView({
                      current: currentData,
                      historical: historicalData,
                      yesterday: yesterdayData,
                      pressureChange: pressureChangeData,
                  })
                : null,
        [currentData, historicalData, yesterdayData, pressureChangeData]
    );

    // 2. Forecast
    const forecastSection = useMemo(
        () =>
            buildForecast({
                hourlyData,
                dailyData,
            }),
        [hourlyData, dailyData]
    );

    // 3. Wind
    const windSection = useMemo(
        () => (currentData ? buildWind(currentData.wind) : null),
        [currentData]
    );

    // 4. Rainfall
    const rainfallSection = useMemo(
        () =>
            currentData
                ? buildRainfall({
                      ...currentData.rainfall,
                      lastRain: currentData.raw.lastRain,
                  })
                : null,
        [currentData]
    );

    // 5. Sun & Moon
    const sunMoonSection = useMemo(
        () => (sunMoonData ? buildSunMoon(sunMoonData) : null),
        [sunMoonData]
    );

    // 6. Outdoor
    const outdoorSection = useMemo(
        () =>
            currentData
                ? buildOutdoor({
                      outdoor: currentData.outdoor,
                      changes: {
                          temperatureFromYesterday:
                              yesterdayData?.temperatureFromYesterday ?? null,
                      },
                  })
                : null,
        [currentData, yesterdayData]
    );

    // 7. Humidity
    const humiditySection = useMemo(
        () =>
            currentData
                ? buildHumidity({
                      humidity: currentData.humidity,
                      changes: {
                          humidityFromYesterday:
                              yesterdayData?.humidityFromYesterday ?? null,
                      },
                  })
                : null,
        [currentData, yesterdayData]
    );

    // 8. Pressure
    const pressureSection = useMemo(
        () =>
            currentData
                ? buildPressure({
                      pressure: currentData.pressure,
                      changes: {
                          pressureRate: pressureChangeData?.pressureRate ?? null,
                      },
                  })
                : null,
        [currentData, pressureChangeData]
    );

    const hasErrors = Boolean(
        currentError ||
        historicalError ||
        yesterdayError ||
        pressureChangeError ||
        forecastError
    );

    const hasForecastData = Boolean(
        sunMoonData ||
        hourlyData.length > 0 ||
        (dailyData?.DailyForecasts.length ?? 0) > 0
    );

    const retryAllFailed = async() => {
        await Promise.all([
            retryWeather(),
            retryForecast(),
        ]);
    };

    return (
        <ScrollView>
            {(weatherLoading || forecastLoading) && (
                <Text>Cargando...</Text>
            )}

            {/* Errores globales de Ambient Weather y AccuWeather */}
            {hasErrors && (
                <Button
                    title="Reintentar datos"
                    onPress={retryAllFailed}
                />
            )}

            {/* 1. Quick View */}
            {quickSections && (
                <View key={quickSections.id}>
                    <LastConnectionWarning visible={Boolean(
                            (currentError && currentData) ||
                            (historicalError && historicalData) ||
                            (yesterdayError && yesterdayData) ||
                            (pressureChangeError && pressureChangeData)
                        )} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{quickSections.title}</Text>

                    {quickSections.sections.map((section) => (
                        <View key={section.id}>
                            <Text style={{ fontWeight: "bold"}}>{section.title}</Text>

                            {section.metrics.map((metric) => (
                                <View key={metric.id}>
                                    <Text>{metric.label}</Text>
                                    <Text>{metric.value}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            )}

            {/* 2. Forecast */}
            <View>
                <LastConnectionWarning visible={Boolean(forecastError && hasForecastData)} />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{forecastSection.title}</Text>

                <Text style={{ fontWeight: "bold"}}>Pronóstico por horas</Text>

                {forecastSection.hourly.map((hour) => (
                    <View key={hour.id}>
                        {hour.metrics.map((metric) => (
                            <View key={metric.id}>
                                <Text>{metric.label}</Text>
                                <Text>{metric.value}</Text>
                            </View>
                        ))}
                    </View>
                ))}

                <Text style={{ fontWeight: "bold"}}>Pronóstico diario</Text>

                {forecastSection.daily.map((day) => (
                    <View key={day.id}>
                        {day.metrics.map((metric) => (
                            <View key={metric.id}>
                                <Text>{metric.label}</Text>
                                <Text>{metric.value}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* 3. Wind */}
            {windSection && (
                <View>
                    <LastConnectionWarning visible={Boolean(currentError && currentData)} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{windSection.title}</Text>

                    {windSection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 4. Rainfall */}
            {rainfallSection && (
                <View>
                    <LastConnectionWarning visible={Boolean(currentError && currentData)} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{rainfallSection.title}</Text>

                    {rainfallSection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 5. Sun & Moon */}
            {sunMoonSection && (
                <View>
                    <LastConnectionWarning visible={Boolean(forecastError && sunMoonData)} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{sunMoonSection.title}</Text>

                    {sunMoonSection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 6. Outdoor */}
            {outdoorSection && (
                <View>
                    <LastConnectionWarning visible={Boolean((currentError && currentData) || (yesterdayError && yesterdayData))} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{outdoorSection.title}</Text>

                    {outdoorSection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 7. Humidity */}
            {humiditySection && (
                <View>
                    <LastConnectionWarning visible={Boolean((currentError && currentData) || (yesterdayError && yesterdayData))} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{humiditySection.title}</Text>

                    {humiditySection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 8. Pressure */}
            {pressureSection && (
                <View>
                    <LastConnectionWarning visible={Boolean((currentError && currentData) || (pressureChangeError && pressureChangeData))} />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{pressureSection.title}</Text>

                    {pressureSection.metrics.map((metric) => (
                        <View key={metric.id}>
                            <Text>{metric.label}</Text>
                            <Text>{metric.value}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}