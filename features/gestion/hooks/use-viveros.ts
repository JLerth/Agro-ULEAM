import { useSyncExternalStore } from "react";

import {
    getViverosLots,
    subscribeViverosLots,
} from "../repositories/viverosLotsRepository";

export function useViveros() {
    return useSyncExternalStore(
        subscribeViverosLots,
        getViverosLots,
        getViverosLots,
    );
}