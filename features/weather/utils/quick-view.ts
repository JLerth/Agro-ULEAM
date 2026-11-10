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
        title: "Vista Rapida",
        sections: [
            {
                id: "outdoor",
                title: "Exterior",
                metrics: [
                    metric("temperature", "Temperatura", withUnit(outdoor.temperature, 1, "°C")),
                    metric(
                        "temperature-from-yesterday",
                        "Respecto a Ayer",
                        withSign(yesterday?.temperatureFromYesterday, 1, "°C")
                    ),
                    metric("feels-like", "Sensación Térmica", withUnit(outdoor.feelsLike, 1, "°C")),
                    metric("today-range", "Máxima y Mínima de Hoy", formatRange(current.historical.today)),
                    metric("yesterday-range", "Máxima y Mínima de Ayer", formatRange(past?.yesterday)),
                    metric("weekly-range", "Máxima y Mínima de la Semana", formatRange(past?.weekly)),
                    metric("monthly-range", "Máxima y Mínima del Mes", formatRange(past?.monthly)),
                    //metric("yearly-range", "Máxima y Mínima del Año", formatRange(past?.yearly)),
                ],
            },
            {
                id: "wind",
                title: "Viento",
                metrics: [
                    metric("speed", "Velocidad", withUnit(wind.speed, 1, " km/h")),
                    metric("gust", "Ráfaga", withUnit(wind.gust, 1, " km/h")),
                    metric("max-daily-gust", "Máxima Ráfaga Diaria", withUnit(wind.maxDailyGust, 1, " km/h")),
                    metric("direction", "Dirección", formatDegrees(wind.direction)),
                    metric(
                        "average-direction",
                        "Dirección Promedio (10 mins)",
                        formatDegrees(wind.averageDirection)
                    ),
                ],
            },
            {
                id: "rain",
                title: "Lluvia",
                metrics: [
                    metric("rate", "Intensidad", withUnit(rainfall.hourly, 2, " mm/h")),
                    metric("daily", "Diario", withUnit(rainfall.daily, 2, " mm")),
                    metric("weekly", "Semanal", withUnit(rainfall.weekly, 2, " mm")),
                    metric("event", "Evento", withUnit(rainfall.event, 2, " mm")),
                    metric("monthly", "Mensual", withUnit(rainfall.monthly, 2, " mm")),
                    metric("yearly", "Anual", withUnit(rainfall.yearly, 2, " mm")),
                    metric("total", "Total", withUnit(rainfall.total, 2, " mm")),
                ],
            },
            {
                id: "pressure",
                title: "Presión",
                metrics: [
                    metric("relative", "Relativa", withUnit(pressure.relative, 1, " hPa")),
                    metric("rate", "Tasa", withSign(pressureChange?.pressureRate, 2, " hPa/hr")),
                ],
            },
            {
                id: "humidity",
                title: "Humedad",
                metrics: [
                    metric("current", "Humedad", withUnit(humidity.current, 0, "%")),
                    metric(
                        "humidity-from-yesterday",
                        "Respecto a Ayer",
                        withSign(yesterday?.humidityFromYesterday, 0, "%")
                    ),
                ],
            },
        ],

    };
}