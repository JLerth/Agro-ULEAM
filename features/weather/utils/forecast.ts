const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface HourlyForecastInput {
    DateTime: string;
    Temperature: {
        Value: number;
    };
    IconPhrase: string;
}

interface DailyForecastInput {
    Date: string;
    Temperature: {
        Maximum: {
            Value: number;
        };
        Minimum: {
            Value: number;
        };
    };
    Day: {
        PrecipitationProbability?: number | null;
    };
    Night: {
        PrecipitationProbability?: number | null;
    };
}

interface ForecastInput {
    hourlyData: HourlyForecastInput[];
    dailyData: {
        DailyForecasts: DailyForecastInput[];
    } | null;
}

export interface ForecastMetric {
    id: string;
    label: string;
    value: string;
}

export interface HourlyForecast {
    id: string;
    metrics: ForecastMetric[];
}

export interface DailyForecast {
    id: string;
    metrics: ForecastMetric[];
}

export interface ForecastSection {
    id: "forecast";
    title: string;
    hourly: HourlyForecast[];
    daily: DailyForecast[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

function formatValue(
    value: number | null,
    decimals = 0
): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return value.toFixed(decimals);
}

/**
 * Convierte una fecha en hora local de Ecuador.
 */
function formatTime(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return NO_VALUE;
    }

    return new Intl.DateTimeFormat("es-EC", {
        timeZone: "America/Guayaquil",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}

/**
 * Convierte una fecha en la inicial del día de la semana.
 */
function formatWeekday(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return NO_VALUE;
    }

    const weekday = new Intl.DateTimeFormat("es-EC", {
        timeZone: "America/Guayaquil",
        weekday: "long",
    }).format(date).toLowerCase();

    const weekdays: Record<string, string> = {
        lunes: "L",
        martes: "M",
        miércoles: "Mi",
        jueves: "J",
        viernes: "V",
        sábado: "S",
        domingo: "D",
    };

    return weekdays[weekday] ?? NO_VALUE;
}

function metric(
    id: string,
    label: string,
    value: string
): ForecastMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los pronósticos por horas y por días
 * en estructuras listas para mostrar.
 */
export function buildForecast({
    hourlyData,
    dailyData,
}: ForecastInput): ForecastSection {
    const hourlyForecast = hourlyData.slice(0, 12);
    const dailyForecast = dailyData?.DailyForecasts ?? [];

    return {
        id: "forecast",
        title: "Forecast",

        hourly: hourlyForecast.map((hour, index) => ({
            id: hour.DateTime,
            metrics: [
                metric(
                    "time",
                    "Time",
                    index === 0 ? "Ahora" : formatTime(hour.DateTime)
                ),
                metric(
                    "temperature",
                    "Temperature",
                    `${formatValue(hour.Temperature.Value)} °C`
                ),
                metric(
                    "condition",
                    "Condition",
                    hour.IconPhrase || NO_VALUE
                ),
            ],
        })),

        daily: dailyForecast.map((day) => ({
            id: day.Date,
            metrics: [
                metric(
                    "weekday",
                    "Day",
                    formatWeekday(day.Date)
                ),
                metric(
                    "maximum",
                    "Maximum",
                    `${formatValue(day.Temperature.Maximum.Value)} °C`
                ),
                metric(
                    "minimum",
                    "Minimum",
                    `${formatValue(day.Temperature.Minimum.Value)} °C`
                ),
                metric(
                    "day-precipitation",
                    "Day Precipitation",
                    `${formatValue(day.Day.PrecipitationProbability ?? null)}%`
                ),
                metric(
                    "night-precipitation",
                    "Night Precipitation",
                    `${formatValue(day.Night.PrecipitationProbability ?? null)}%`
                ),
            ],
        })),
    };
}