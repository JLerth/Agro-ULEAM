const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface RainfallInput {
    hourly: number | null;
    daily: number | null;
    event: number | null;
    weekly: number | null;
    monthly: number | null;
    yearly: number | null;
    total: number | null;
    lastRain: string | null | undefined;
}

export interface RainfallMetric {
    id: string;
    label: string;
    value: string;
}

export interface RainfallSection {
    id: "rainfall";
    title: string;
    metrics: RainfallMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

function formatValue(
    value: number | null,
    decimals = 2
): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return value.toFixed(decimals);
}

function metric(
    id: string,
    label: string,
    value: string
): RainfallMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos de precipitación en una sección lista para mostrar.
 */
export function buildRainfall(
    rainfall: RainfallInput
): RainfallSection {
    return {
        id: "rainfall",
        title: "Rainfall",
        metrics: [
            metric(
                "rate",
                "Rate",
                `${formatValue(rainfall.hourly)} mm/h`
            ),
            metric(
                "daily",
                "Day",
                `${formatValue(rainfall.daily)} mm`
            ),
            metric(
                "event",
                "Event",
                `${formatValue(rainfall.event)} mm`
            ),
            metric(
                "weekly",
                "Week",
                `${formatValue(rainfall.weekly)} mm`
            ),
            metric(
                "monthly",
                "Month",
                `${formatValue(rainfall.monthly)} mm`
            ),
            metric(
                "yearly",
                "Year",
                `${formatValue(rainfall.yearly)} mm`
            ),
            metric(
                "total",
                "Total",
                `${formatValue(rainfall.total)} mm`
            ),
            metric(
                "last-rain",
                "Last Rainfall",
                rainfall.lastRain ?? NO_VALUE
            ),
        ],
    };
}