import type {
    AccuWeatherDailyResponse,
    AccuWeatherHourlyResponse,
} from "@/features/weather/types/accuweather.types";

const API_KEY = process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY;
const LOCATION_KEY = process.env.EXPO_PUBLIC_ACCUWEATHER_LOCATION_KEY;

const REQUEST_TIMEOUT = 15 * 1000;

// Combina el signal del hook con un timeout, para que una petición colgada
// no bloquee para siempre la deduplicación del hook.
function withTimeout(signal?: AbortSignal) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const onAbort = () => controller.abort();

    if (signal?.aborted) controller.abort();
    signal?.addEventListener("abort", onAbort, { once: true });

    return {
        signal: controller.signal,
        clear: () => {
            clearTimeout(timer);
            signal?.removeEventListener("abort", onAbort);
        },
    };
}

async function fetchAccuWeather<T>(
    endpoint: string,
    errorMessage: string,
    signal?: AbortSignal
): Promise<T> {
    if (!API_KEY || !LOCATION_KEY) {
        throw new Error(
            "Falta configurar las credenciales de AccuWeather."
        );
    }

    const url = new URL(
        `https://dataservice.accuweather.com/${endpoint}/${LOCATION_KEY}`
    );

    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("details", "true");
    url.searchParams.set("metric", "true");
    url.searchParams.set("language", "es-ec");

    const request = withTimeout(signal);

    try {
        const response = await fetch(url.toString(), {
            cache: "no-store",
            signal: request.signal,
        });

        if (!response.ok) {
            throw new Error(`${errorMessage}: ${response.status}`);
        }

        return (await response.json()) as T;
    } finally {
        request.clear();
    }
}

export function getAccuWeatherForecast(
    signal?: AbortSignal
): Promise<AccuWeatherDailyResponse> {
    return fetchAccuWeather<AccuWeatherDailyResponse>(
        "forecasts/v1/daily/7day",
        "Error al consultar AccuWeather",
        signal
    );
}

export function getAccuWeatherHourlyForecast(
    signal?: AbortSignal
): Promise<AccuWeatherHourlyResponse> {
    return fetchAccuWeather<AccuWeatherHourlyResponse>(
        "forecasts/v1/hourly/12hour",
        "Error al consultar el pronóstico horario",
        signal
    );
}