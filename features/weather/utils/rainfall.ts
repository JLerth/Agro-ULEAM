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
        title: "Lluvia",
        metrics: [
            metric(
                "rate",
                "Intensidad",
                `${formatValue(rainfall.hourly)} mm/h`
            ),
            metric(
                "daily",
                "Diario",
                `${formatValue(rainfall.daily)} mm`
            ),
            metric(
                "event",
                "Evento",
                `${formatValue(rainfall.event)} mm`
            ),
            metric(
                "weekly",
                "Semanal",
                `${formatValue(rainfall.weekly)} mm`
            ),
            metric(
                "monthly",
                "Mensual",
                `${formatValue(rainfall.monthly)} mm`
            ),
            metric(
                "yearly",
                "Anual",
                `${formatValue(rainfall.yearly)} mm`
            ),
            metric(
                "total",
                "Total",
                `${formatValue(rainfall.total)} mm`
            ),
            metric(
                "last-rain",
                "Última Lluvia",
                rainfall.lastRain ?? NO_VALUE
            ),
        ],
    };
}