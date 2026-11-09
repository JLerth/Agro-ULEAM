const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface HumidityInput {
    humidity: {
        current: number | null;
    };
    changes: {
        humidityFromYesterday: number | null;
    };
}

export interface HumidityMetric {
    id: string;
    label: string;
    value: string;
}

export interface HumiditySection {
    id: "humidity";
    title: string;
    metrics: HumidityMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

function formatValue(value: number | null): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return value.toFixed(0);
}

/**
 * Formatea una variación incluyendo el signo positivo cuando corresponde.
 */
function formatChange(value: number | null): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return `${value > 0 ? "+" : ""}${value.toFixed(0)}`;
}

function metric(
    id: string,
    label: string,
    value: string
): HumidityMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos de humedad en una sección lista para mostrar.
 */
export function buildHumidity(data: HumidityInput): HumiditySection {
    const { humidity, changes } = data;

    return {
        id: "humidity",
        title: "Humidity",
        metrics: [
            metric(
                "current",
                "Humidity",
                `${formatValue(humidity.current)}%`
            ),
            metric(
                "humidity-from-yesterday",
                "From Yesterday",
                `${formatChange(changes.humidityFromYesterday)}%`
            ),
        ],
    };
}