import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

const MAX_RETRIES = 2;

export function useFontLoader() {
    const [fontError, setFontError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const SIMULATE_FONT_ERROR = false;

    useEffect(() => {
        let cancelled = false;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;

        if (SIMULATE_FONT_ERROR) {
            Promise.reject(new Error("Error simulado de carga de Ionicons"))
                .catch((error) => {
                    console.error("Error cargando Ionicons:", error);

                    if (cancelled) return;

                    if (retryCount < MAX_RETRIES) {
                        retryTimer = setTimeout(() => {
                            setRetryCount((count) => count + 1);
                        }, 1000 * (retryCount + 1));
                    } else {
                        setFontError(true);
                    }
                });

            return () => {
                cancelled = true;

                if (retryTimer) clearTimeout(retryTimer);
            };
        }

        Font.loadAsync(Ionicons.font)
            .then(() => {
                if (!cancelled) {
                    setFontError(false);
                }
            })
            .catch((error) => {
                console.error("Error cargando Ionicons:", error);

                if (cancelled) return;

                if (retryCount < MAX_RETRIES) {
                    retryTimer = setTimeout(() => {
                        setRetryCount((count) => count + 1);
                    }, 1000 * (retryCount + 1));
                } else {
                    setFontError(true);
                }
            });

        return () => {
            cancelled = true;

            if (retryTimer) {
                clearTimeout(retryTimer);
            }
        };
    }, [retryCount]);

    useEffect(() => {
        if (!fontError) return;

        const timer = setTimeout(() => {
            setFontError(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [fontError]);

    return {
        fontError,
        dismissFontError: () => setFontError(false),
    };
}