const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

type Range = { high: number | null; low: number | null };

export interface QuickViewInput {
    current: {
        outdoor: {
            temperature: number | null;
            feelsLike: number | null;
        };
        wind: {
            speed: number | null;
            gust: number | null;
            maxDailyGust: number | null;
            direction: number | null;
            averageDirection: number | null;
        };
        rainfall: {
            hourly: number | null;
            daily: number | null;
            weekly: number | null;
            event: number | null;
            monthly: number | null;
            yearly: number | null;
            total: number | null;
        };
        pressure: {
            relative: number | null;
        };
        humidity: {
            current: number | null;
        };
        historical: {
            today: Range;
        };
    };
    historical: {
        historical: {
            yesterday: Range;
            weekly: Range;
            monthly: Range;
            yearly: Range;
        };
    } | null;
    yesterday: {
        temperatureFromYesterday: number | null;
        humidityFromYesterday: number | null;
    } | null;
    pressureChange: {
        pressureRate: number | null;
    } | null;
}

export interface QuickMetric {
    id: string;
    label: string;
    value: string;
}

export interface QuickViewSection {
    id: "quick-view";
    title: string;
    sections: QuickSection[];
}

export interface QuickSection {
    id: "outdoor" | "wind" | "rain" | "pressure" | "humidity";
    title: string;
    metrics: QuickMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

function isValid(value: number | null | undefined): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

/** 21.5 → "21.5°C". Si no hay dato, devuelve "—". */
function withUnit(
    value: number | null | undefined,
    decimals: number,
    unit: string
): string {
    return isValid(value) ? `${value.toFixed(decimals)}${unit}` : NO_VALUE;
}

/** Igual que withUnit, pero con "+" para los positivos. */
function withSign(
    value: number | null | undefined,
    decimals: number,
    unit: string
): string {
    if (!isValid(value)) return NO_VALUE;

    return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}${unit}`;
}

/** Máxima y mínima: "28.1°C / 19.4°C". */
function formatRange(range: Range | null | undefined): string {
    return `${withUnit(range?.high, 1, "°C")} / ${withUnit(range?.low, 1, "°C")}`;
}

/** Dirección del viento redondeada: 183.6 → "184°". */
function formatDegrees(value: number | null | undefined): string {
    return isValid(value) ? `${Math.round(value)}°` : NO_VALUE;
}

function metric(id: string, label: string, value: string): QuickMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos del clima en secciones listas para mostrar.
 */
export function buildQuickView({
    current,
    historical,
    yesterday,
    pressureChange,
}: QuickViewInput): QuickViewSection {
    const { outdoor, wind, rainfall, pressure, humidity } = current;
    const past = historical?.historical;

    return {
        id: "quick-view",
        title: "Quick View",
        sections: [
            {
                id: "outdoor",
                title: "Outdoor",
                metrics: [
                    metric("temperature", "Temperature", withUnit(outdoor.temperature, 1, "°C")),
                    metric(
                        "temperature-from-yesterday",
                        "From Yesterday",
                        withSign(yesterday?.temperatureFromYesterday, 1, "°C")
                    ),
                    metric("feels-like", "Feels Like", withUnit(outdoor.feelsLike, 1, "°C")),
                    metric("today-range", "Today's High/Low", formatRange(current.historical.today)),
                    metric("yesterday-range", "Yesterday's High/Low", formatRange(past?.yesterday)),
                    metric("weekly-range", "Weekly High/Low", formatRange(past?.weekly)),
                    metric("monthly-range", "Monthly High/Low", formatRange(past?.monthly)),
                    metric("yearly-range", "Yearly High/Low", formatRange(past?.yearly)),
                ],
            },
            {
                id: "wind",
                title: "Wind",
                metrics: [
                    metric("speed", "Speed", withUnit(wind.speed, 1, " km/h")),
                    metric("gust", "Gust", withUnit(wind.gust, 1, " km/h")),
                    metric("max-daily-gust", "Max Daily Gust", withUnit(wind.maxDailyGust, 1, " km/h")),
                    metric("direction", "Direction", formatDegrees(wind.direction)),
                    metric(
                        "average-direction",
                        "Avg Direction (10 mins)",
                        formatDegrees(wind.averageDirection)
                    ),
                ],
            },
            {
                id: "rain",
                title: "Rain",
                metrics: [
                    metric("rate", "Rate", withUnit(rainfall.hourly, 2, " mm/h")),
                    metric("daily", "Daily", withUnit(rainfall.daily, 2, " mm")),
                    metric("weekly", "Weekly", withUnit(rainfall.weekly, 2, " mm")),
                    metric("event", "Event", withUnit(rainfall.event, 2, " mm")),
                    metric("monthly", "Monthly", withUnit(rainfall.monthly, 2, " mm")),
                    metric("yearly", "Yearly", withUnit(rainfall.yearly, 2, " mm")),
                    metric("total", "Total", withUnit(rainfall.total, 2, " mm")),
                ],
            },
            {
                id: "pressure",
                title: "Pressure",
                metrics: [
                    metric("relative", "Relative", withUnit(pressure.relative, 1, " hPa")),
                    metric("rate", "Rate", withSign(pressureChange?.pressureRate, 2, " hPa/hr")),
                ],
            },
            {
                id: "humidity",
                title: "Humidity",
                metrics: [
                    metric("current", "Humidity", withUnit(humidity.current, 0, "%")),
                    metric(
                        "humidity-from-yesterday",
                        "From Yesterday",
                        withSign(yesterday?.humidityFromYesterday, 0, "%")
                    ),
                ],
            },
        ],

    };
}