const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface HourlyForecastInput {
    DateTime: string;
    Temperature: {
        Value: number;
    };
    WeatherIcon: number;
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
        Icon: number;
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
    //label: string;
    value: string;
}

export interface HourlyForecast {
    id: string;
    isCurrentHour: boolean;
    weatherIcon: number;
    metrics: ForecastMetric[];
}

export interface DailyForecast {
    id: string;
    isToday: boolean;
    weatherIcon: number;
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
 * Comprueba si el pronóstico corresponde a la hora que está transcurriendo.
 */
function isCurrentHour(value: string): boolean {
    const forecastDate = new Date(value);

    if (Number.isNaN(forecastDate.getTime())) {
        return false;
    }

    const now = Date.now();
    const forecastStart = forecastDate.getTime();
    const forecastEnd = forecastStart + 60 * 60 * 1000;

    return now >= forecastStart && now < forecastEnd;
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
    //label: string,
    value: string
): ForecastMetric {
    return { id, value };
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
    const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyForecast = (dailyData?.DailyForecasts ?? [])
            .filter((day) => {
                const forecastDate = new Date(day.Date);
                forecastDate.setHours(0, 0, 0, 0);

                return forecastDate >= today;
            })
            .slice(0, 7);

        console.log(
        "ACCuweather fechas:",
        dailyForecast.map((day) => ({
            date: day.Date,
            weekday: formatWeekday(day.Date),
            today: new Date(day.Date).toDateString() === new Date().toDateString(),
        }))
    );
    return {
        id: "forecast",
        title: "Pronostico",

        hourly: hourlyForecast.map((hour) => {
            const currentHour = isCurrentHour(hour.DateTime);

            return {
                id: hour.DateTime,
                isCurrentHour: currentHour,
                weatherIcon: hour.WeatherIcon,
                metrics: [
                    metric(
                        "time",
                        currentHour
                            ? "Ahora"
                            : formatTime(hour.DateTime)
                    ),
                    metric(
                        "temperature",
                        `${formatValue(hour.Temperature.Value)} °C`
                    ),
                ],
            };
        }),

        daily: dailyForecast.map((day) => ({
            id: day.Date,
            isToday: new Date(day.Date).toDateString() === new Date().toDateString(),
            weatherIcon: day.Day.Icon,
            metrics: [
                metric(
                    "weekday",
                    //"Día",
                    formatWeekday(day.Date)
                ),
                metric(
                    "maximum",
                    //"Máxima",
                    `${formatValue(day.Temperature.Maximum.Value)} °C`
                ),
                metric(
                    "minimum",
                    //"Mínima",
                    `${formatValue(day.Temperature.Minimum.Value)} °C`
                ),
                metric(
                    "day-precipitation",
                    //"Precipitación de Día",
                    `${formatValue(day.Day.PrecipitationProbability ?? null)}%`
                ),
                metric(
                    "night-precipitation",
                    //"Precipitación de Noche",
                    `${formatValue(day.Night.PrecipitationProbability ?? null)}%`
                ),
            ],
        })),
    };
}