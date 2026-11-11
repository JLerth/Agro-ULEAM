const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface PressureInput {
    pressure: {
        relative: number | null;
    };
    changes: {
        pressureRate: number | null;
    };
}

export interface PressureMetric {
    id: string;
    label: string;
    value: string;
}

export interface PressureSection {
    id: "pressure";
    title: string;
    metrics: PressureMetric[];
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

function metric(
    id: string,
    label: string,
    value: string
): PressureMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos de presión en una sección lista para mostrar.
 */
export function buildPressure(data: PressureInput): PressureSection {
    const { pressure, changes } = data;

    return {
        id: "pressure",
        title: "Presión",
        metrics: [
            metric(
                "pressure-rate",
                "Tasa",
                changes.pressureRate === null
                    ? NO_VALUE
                    : `${formatValue(changes.pressureRate)} hPa/h`
            ),
            metric(
                "relative",
                "Relativa",
                `${formatValue(pressure.relative)} hPa`
            ),
        ],
    };
}