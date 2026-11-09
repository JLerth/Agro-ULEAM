const NO_VALUE = "—";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface SunMoonInput {
    Sun: {
        Rise: string;
        Set: string;
    };
    Moon: {
        Rise: string | null;
        Set: string | null;
        Phase: string;
    };
}

export interface SunMoonMetric {
    id: string;
    label: string;
    value: string;
}

export interface SunMoonSection {
    id: "sun-moon";
    title: string;
    metrics: SunMoonMetric[];
}

/* -------------------------------------------------------------------------- */
/* Formato                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Convierte una fecha en hora local de Ecuador.
 */
function formatTime(value: string | null | undefined): string {
    if (!value) return NO_VALUE;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return NO_VALUE;

    return new Intl.DateTimeFormat("es-EC", {
        timeZone: "America/Guayaquil",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23",
    }).format(date);
}

/**
 * Calcula la duración entre el amanecer y el atardecer.
 */
function formatDayLength(
    rise: string,
    set: string
): string {
    const sunrise = new Date(rise);
    const sunset = new Date(set);

    if (
        Number.isNaN(sunrise.getTime()) ||
        Number.isNaN(sunset.getTime())
    ) {
        return NO_VALUE;
    }

    const totalMinutes = Math.round(
        (sunset.getTime() - sunrise.getTime()) / 60000
    );

    if (totalMinutes < 0) return NO_VALUE;

    const wholeHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${wholeHours} h ${minutes} min`;
}

/**
 * Traduce las fases lunares de AccuWeather al español.
 */
function formatMoonPhase(phase: string): string {
    const phases: Record<string, string> = {
        New: "Luna nueva",
        WaxingCrescent: "Luna creciente",
        First: "Cuarto creciente",
        WaxingGibbous: "Gibosa creciente",
        Full: "Luna llena",
        WaningGibbous: "Gibosa menguante",
        Last: "Cuarto menguante",
        WaningCrescent: "Luna menguante",
    };

    return phases[phase] ?? phase;
}

function metric(
    id: string,
    label: string,
    value: string
): SunMoonMetric {
    return { id, label, value };
}

/* -------------------------------------------------------------------------- */
/* Función principal                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convierte los datos solares y lunares en una sección lista para mostrar.
 */
export function buildSunMoon(data: SunMoonInput): SunMoonSection {
    const { Sun, Moon } = data;

    return {
        id: "sun-moon",
        title: "Sol y Luna",
        metrics: [
            metric(
                "day-length",
                "Duración de luz solar",
                formatDayLength(Sun.Rise, Sun.Set)
            ),
            metric(
                "moon-phase",
                "Fase lunar",
                formatMoonPhase(Moon.Phase)
            ),
            metric(
                "sunrise",
                "Amanecer",
                formatTime(Sun.Rise)
            ),
            metric(
                "sunset",
                "Atardecer",
                formatTime(Sun.Set)
            ),
            metric(
                "moonrise",
                "Salida de la Luna",
                formatTime(Moon.Rise)
            ),
            metric(
                "moonset",
                "Puesta de la Luna",
                formatTime(Moon.Set)
            ),
        ],
    };
}