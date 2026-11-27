import { useSyncExternalStore } from "react";

type LotsRepository<T> = {
    subscribe: (listener: () => void) => () => void;
    getAll: () => T[];
};

export function useLots<T>(repository: LotsRepository<T>) {
    return useSyncExternalStore(
        repository.subscribe,
        repository.getAll,
        repository.getAll,
    );
}