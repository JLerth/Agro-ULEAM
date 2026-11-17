import { useMemo} from "react";
import { ScrollView} from "react-native";

import { Text, View, useThemeColor } from "@/components/Themed";

import { useWeatherData } from "@/features/weather/hooks/use-weather";
import { useAccuWeather } from "@/features/weather/hooks/use-accuweather";

import { StationLocationSection } from "@/features/weather/components/station-section";
import { STATION_CONFIG } from "@/constants/station";
import { DEFAULT_STATION_DISPLAY } from "@/features/weather/config/station-display";

//import { buildQuickView } from "@/features/weather/utils/quick-view";
import { buildForecast } from "@/features/weather/utils/forecast";
import { buildWind } from "@/features/weather/utils/wind";
import { buildRainfall } from "@/features/weather/utils/rainfall";
import { buildSunMoon } from "@/features/weather/utils/sun-moon";
import { buildOutdoor } from "@/features/weather/utils/outdoor";
import { buildHumidity } from "@/features/weather/utils/humidity";
import { buildPressure } from "@/features/weather/utils/pressure";

//import { QuickViewSection } from "@/features/weather/components/quick-view-section";
import { ForecastSection } from "@/features/weather/components/forecast-section";
import { WeatherMetricSection } from "@/features/weather/components/weather-metric-section";

import { weatherStyles } from "@/features/weather/styles/weather.styles";

export default function WeatherScreen() {
    // Datos de Ambient Weather
    const {
        currentData,
        // historicalData,
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
    // const quickSections = useMemo(
    //     () =>
    //         currentData
    //             ? buildQuickView({
    //                   current: currentData,
    //                   historical: historicalData,
    //                   yesterday: yesterdayData,
    //                   pressureChange: pressureChangeData,
    //               })
    //             : null,
    //     [currentData, historicalData, yesterdayData, pressureChangeData]
    // );

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
    
    const renderHumidityPressure = () => {
        if (humiditySection && pressureSection) {
            return (
                <View style={weatherStyles.weatherMetricsRow}>
                    <WeatherMetricSection
                        data={humiditySection}
                        showLastConnectionWarning={Boolean(
                            (currentError && currentData) ||
                            (yesterdayError && yesterdayData)
                        )}
                        compact
                    />

                    <WeatherMetricSection
                        data={pressureSection}
                        showLastConnectionWarning={Boolean(
                            (currentError && currentData) ||
                            (pressureChangeError && pressureChangeData)
                        )}
                        compact
                    />
                </View>
            );
        }

        return (
            <>
                {humiditySection && (
                    <WeatherMetricSection
                        data={humiditySection}
                        showLastConnectionWarning={Boolean(
                            (currentError && currentData) ||
                            (yesterdayError && yesterdayData)
                        )}
                    />
                )}

                {pressureSection && (
                    <WeatherMetricSection
                        data={pressureSection}
                        showLastConnectionWarning={Boolean(
                            (currentError && currentData) ||
                            (pressureChangeError && pressureChangeData)
                        )}
                    />
                )}
            </>
        );
    };

    return (
        <ScrollView
            style={{ backgroundColor: useThemeColor({}, "background") }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {(weatherLoading || forecastLoading) && (
                <Text>Cargando...</Text>
            )}

            {/* 1. Quick View */}
            {/* {quickSections && (
                <QuickViewSection
                    data={quickSections}
                    showLastConnectionWarning={Boolean(
                        (currentError && currentData) ||
                        (historicalError && historicalData) ||
                        (yesterdayError && yesterdayData) ||
                        (pressureChangeError && pressureChangeData)
                    )}
                />
            )} */}

            {/* 1. Ubicación */}
            <StationLocationSection
                stationName={STATION_CONFIG.display.stationName}
                location={STATION_CONFIG.display.location}
                config={DEFAULT_STATION_DISPLAY}
                showRetry={hasErrors}
                onRetry={retryAllFailed}
            />

            {/* 2. Forecast */}
            <ForecastSection
                data={forecastSection}
                showLastConnectionWarning={Boolean(
                    forecastError && hasForecastData
                )}
            />

            {/* 3. Wind */}
            {windSection && (
                <WeatherMetricSection
                    data={windSection}
                    showLastConnectionWarning={Boolean(
                        currentError && currentData
                    )}
                />
            )}

            {/* 4. Rainfall */}
            {rainfallSection && (
                <WeatherMetricSection
                    data={rainfallSection}
                    showLastConnectionWarning={Boolean(
                        currentError && currentData
                    )}
                />
            )}

            {/* 5. Sun & Moon */}
            {sunMoonSection && (
                <WeatherMetricSection
                    data={sunMoonSection}
                    showLastConnectionWarning={Boolean(
                        forecastError && sunMoonData
                    )}
                />
            )}

            {/* 6. Outdoor */}
            {outdoorSection && (
                <WeatherMetricSection
                    data={outdoorSection}
                    showLastConnectionWarning={Boolean(
                        (currentError && currentData) ||
                        (yesterdayError && yesterdayData)
                    )}
                />
            )}

            {/* 7. Humidity & Pressure */}
            {renderHumidityPressure()}
        </ScrollView>
    );
}