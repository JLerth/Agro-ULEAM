const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface OutdoorInput {
    outdoor: {
        temperature: number | null;
        feelsLike: number | null;
        dewPoint: number | null;
    };
    changes: {
        temperatureFromYesterday: number | null;
    };
}

export interface OutdoorMetric {
    id: string;
    label: string;
    value: string;
}

export interface OutdoorSection {
    id: "outdoor";
    title: string;
    metrics: OutdoorMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

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
 * Formatea una variación incluyendo el signo positivo cuando corresponde.
 */
function formatChange(
    value: number | null,
    decimals = 1
): string {
    if (value === null || !Number.isFinite(value)) {
        return NO_VALUE;
    }

    return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}`;
}

function metric(
    id: string,
    label: string,
    value: string
): OutdoorMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos exteriores en una sección lista para mostrar.
 */
export function buildOutdoor(data: OutdoorInput): OutdoorSection {
    const { outdoor, changes } = data;

    return {
        id: "outdoor",
        title: "Exterior",
        metrics: [
            metric(
                "temperature",
                "Temperatura",
                `${formatValue(outdoor.temperature)}°`
            ),
            metric(
                "dew-point",
                "Punto de Rociado",
                `${formatValue(outdoor.dewPoint)}°C`
            ),
            metric(
                "temperature-from-yesterday",
                "Respecto de Ayer",
                `${formatChange(changes.temperatureFromYesterday)}°C`
            ),
            metric(
                "feels-like",
                "Sensación Térmica",
                `${formatValue(outdoor.feelsLike)}°C`
            ),
        ],
    };
}