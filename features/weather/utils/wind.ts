const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface WindInput {
    speed: number | null;
    gust: number | null;
    maxDailyGust: number | null;
    direction: number | null;
    averageDirection: number | null;
}

export interface WindMetric {
    id: string;
    label: string;
    value: string;
}

export interface WindSection {
    id: "wind";
    title: string;
    metrics: WindMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Formatea un valor numérico.
 * Si no hay dato válido, devuelve "—".
 */
function formatValue(
    value: number | null,
    decimals = 1
): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return value.toFixed(decimals);
}

/**
 * Convierte grados en una dirección cardinal.
 * Ejemplo: 45° → "NE".
 */
function getWindDirection(degrees: number | null): string {
    if (degrees === null || !Number.isFinite(degrees)) {
        return NO_VALUE;
    }

    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW",
    ];

    return directions[Math.round(degrees / 22.5) % 16];
}

function metric(
    id: string,
    label: string,
    value: string
): WindMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos del viento en una sección lista para mostrar.
 */
export function buildWind(wind: WindInput): WindSection {
    return {
        id: "wind",
        title: "Wind",
        metrics: [
            metric(
                "average-direction",
                "10 Minute",
                getWindDirection(wind.averageDirection)
            ),
            metric(
                "speed",
                "Speed",
                `${formatValue(wind.speed)} km/h`
            ),
            metric(
                "max-daily-gust",
                "Today's Peak",
                `${formatValue(wind.maxDailyGust)} km/h`
            ),
            metric(
                "direction",
                "From",
                getWindDirection(wind.direction)
            ),
            metric(
                "gust",
                "Gusts",
                `${formatValue(wind.gust)} km/h`
            ),
        ],
    };
}