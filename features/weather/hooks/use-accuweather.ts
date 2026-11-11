import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

import {
    getAccuWeatherForecast,
    getAccuWeatherHourlyForecast,
} from "@/features/weather/services/accuweather";

import type {
    AccuWeatherDailyForecast,
    AccuWeatherDailyResponse,
    AccuWeatherHourlyResponse,
} from "@/features/weather/types/accuweather.types";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

type DataMap = {
    daily: AccuWeatherDailyResponse;
    hourly: AccuWeatherHourlyResponse;
};

type RequestKey = keyof DataMap;

interface Block<T> {
    data: T | null;
    error: string | null;
}

type State = { [K in RequestKey]: Block<DataMap[K]> };

type Action =
    | { [K in RequestKey]: { type: "success"; key: K; data: DataMap[K] } }[RequestKey]
    | { type: "error"; key: RequestKey; error: string };

interface UseAccuWeatherReturn {
    /* Pronóstico del día actual (primer elemento de DailyForecasts). */
    data: AccuWeatherDailyForecast | null;
    dailyData: AccuWeatherDailyResponse | null;
    hourlyData: AccuWeatherHourlyResponse;

    loading: boolean;
    error: string | null;
    dailyError: string | null;
    hourlyError: string | null;

    /* Reintenta únicamente los bloques que están en error. */
    refresh: () => Promise<void>;
    /* Reintenta únicamente los bloques que están en error. */
    retryFailed: () => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Constantes y helpers                                                       */
/* -------------------------------------------------------------------------- */

const REFRESH_INTERVAL = 15 * 60 * 1000;
const RETRY_BASE_DELAY = 30 * 1000;
const MAX_RETRY_DELAY = 5 * 60 * 1000;
const HOUR_IN_MS = 60 * 60 * 1000;

const DEFAULT_ERRORS: Record<RequestKey, string> = {
    daily: "No se pudo obtener el pronóstico diario.",
    hourly: "No se pudo obtener el pronóstico por horas.",
};

const initialState: State = {
    daily: { data: null, error: null },
    hourly: { data: null, error: null },
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "success": {
            if (action.key === "hourly") {
                return {
                    ...state,
                    hourly: {
                        data: mergeHourlyForecast(
                            state.hourly.data,
                            action.data
                        ),
                        error: null,
                    },
                };
            }

            return {
                ...state,
                daily: {
                    data: action.data,
                    error: null,
                },
            };
        }

        case "error":
            // Conserva los últimos datos buenos y solo actualiza el error.
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    error: action.error,
                },
            };
    }
}

function record<T>(value: T): Record<RequestKey, T> {
    return { daily: value, hourly: value };
}

function mergeHourlyForecast(
    previous: AccuWeatherHourlyResponse | null,
    incoming: AccuWeatherHourlyResponse
): AccuWeatherHourlyResponse {
    const previousNow = previous?.[0];

    if (!previousNow) {
        return incoming.slice(0, 12);
    }

    const now = Date.now();
    const previousTimestamp = new Date(previousNow.DateTime).getTime();

    if (
        Number.isNaN(previousTimestamp) ||
        now >= previousTimestamp + HOUR_IN_MS
    ) {
        return incoming.slice(0, 12);
    }

    const currentForecast =
        incoming.find(
            (hour) => hour.DateTime === previousNow.DateTime
        ) ?? previousNow;

    const remainingForecasts = incoming.filter(
        (hour) => hour.DateTime !== currentForecast.DateTime
    );

    return [
        currentForecast,
        ...remainingForecasts,
    ].slice(0, 12);
}
/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useAccuWeather(): UseAccuWeatherReturn {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    // Toda la lógica vive dentro del efecto; aquí solo se expone.
    const retryFailedRef = useRef<(() => Promise<void>) | null>(null);
    const refreshRef = useRef<(() => Promise<void>) | null>(null);

    useEffect(() => {
        // Un único controller por montaje: cancela ciclos, reintentos y
        // recargas manuales al desmontar.
        const controller = new AbortController();
        const { signal } = controller;

        const inFlight = new Map<RequestKey, Promise<boolean>>();
        const timers = new Map<RequestKey, ReturnType<typeof setTimeout>>();
        const attempts = record(0);
        const hasError = record(false);

        // La validación de la respuesta vive en cada fetcher.
        const fetchers: { [K in RequestKey]: () => Promise<DataMap[K]> } = {
            
            daily: async () => {
                const result = await getAccuWeatherForecast(signal);

                if (
                    !result ||
                    !Array.isArray(result.DailyForecasts) ||
                    result.DailyForecasts.length === 0
                ) {
                    throw new Error("La respuesta diaria no contiene pronósticos válidos.");
                }

                return result;
            },
            hourly: async () => {
                const result = await getAccuWeatherHourlyForecast(signal);

                if (!Array.isArray(result) || result.length === 0) {
                    throw new Error("La respuesta horaria no contiene pronósticos válidos.");
                }

                return result;
            },
        };

        const clearTimer = (key: RequestKey) => {
            const timer = timers.get(key);
            if (timer) {
                clearTimeout(timer);
                timers.delete(key);
            }
        };

        // Backoff exponencial: 30 s, 60 s, 120 s... hasta 5 min.
        const scheduleRetry = (key: RequestKey) => {
            clearTimer(key);

            const delay = Math.min(
                RETRY_BASE_DELAY * 2 ** attempts[key],
                MAX_RETRY_DELAY
            );
            attempts[key] += 1;

            timers.set(
                key,
                setTimeout(() => {
                    timers.delete(key);
                    void load(key);
                }, delay)
            );
        };

        /*
         * Carga un bloque. Si ya hay una petición en curso para ese bloque,
         * devuelve la misma promesa (deduplicación). Devuelve true si tuvo éxito.
         */
        const load = (key: RequestKey): Promise<boolean> => {
            if (signal.aborted) return Promise.resolve(false);

            const existing = inFlight.get(key);
            if (existing !== undefined) return existing;

            const run = async (): Promise<boolean> => {
                try {
                    const data = await fetchers[key]();
                    if (signal.aborted) return false;

                    hasError[key] = false;
                    attempts[key] = 0;
                    clearTimer(key);

                    dispatch({ type: "success", key, data } as Action);
                    return true;
                } catch (err) {
                    if (!signal.aborted) {
                        hasError[key] = true;
                        dispatch({
                            type: "error",
                            key,
                            error: err instanceof Error ? err.message : DEFAULT_ERRORS[key],
                        });
                        scheduleRetry(key);
                    }
                    return false;
                }
            };

            const promise = run().finally(() => inFlight.delete(key));
            inFlight.set(key, promise);
            return promise;
        };

        // Los dos bloques son independientes: van en paralelo.
        const refreshAll = async () => {
            if (signal.aborted) return;
            await Promise.all([load("daily"), load("hourly")]);
        };
        const refresh = async () => {
            if (signal.aborted) return;

            await refreshAll();
        };

        const retryFailed = async () => {
            if (signal.aborted) return;

            const failedKeys = (Object.keys(hasError) as RequestKey[]).filter(
                (k) => hasError[k]
            );

            await Promise.all(failedKeys.map(load));
        };

        refreshRef.current = refresh;
        retryFailedRef.current = retryFailed;

        // Carga inicial: loading termina cuando acaba el primer intento,
        // haya salido bien o mal.
        void refreshAll().finally(() => {
            if (!signal.aborted) setLoading(false);
        });

        // Actualización periódica y al recuperar conexión
        const interval = setInterval(() => void refreshAll(), REFRESH_INTERVAL);
        let wasOnline: boolean | null = null;
        const unsubscribeNetInfo = NetInfo.addEventListener((netState) => {
            const online =
                netState.isConnected === true && netState.isInternetReachable !== false;

            // Solo recarga al pasar de sin conexión a conectado.
            if (online && wasOnline === false) void refreshAll();
            wasOnline = online;
        });

        return () => {
            controller.abort();
            clearInterval(interval);
            unsubscribeNetInfo();
            timers.forEach((timer) => clearTimeout(timer));
            timers.clear();

            refreshRef.current = null;
            retryFailedRef.current = null;
        };
    }, []);

    const refresh = useCallback(async () => {
        await refreshRef.current?.();
    }, []);

    const retryFailed = useCallback(async () => {
        await retryFailedRef.current?.();
    }, []);

    return {
        data: state.daily.data?.DailyForecasts[0] ?? null,
        dailyData: state.daily.data,
        hourlyData: state.hourly.data ?? [],

        loading,
        error: state.daily.error ?? state.hourly.error,
        dailyError: state.daily.error,
        hourlyError: state.hourly.error,

        refresh,
        retryFailed,
    };
}