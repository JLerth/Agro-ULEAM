
import {
    viveLots,
    type ViveLot,
    type LotStatus,
} from "../data/viveLots";

let lots: ViveLot[] = [...viveLots];

const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

export function getViverosLots() {
    return lots;
}

export function getViveroLotById(id: string) {
    return lots.find((lot) => lot.id === id);
}

export function subscribeViverosLots(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function updateViveroLotStatus(
    id: string,
    nextStatus: LotStatus,
) {
    const lot = getViveroLotById(id);

    if (!lot) return false;

    const validTransitions: Record<LotStatus, LotStatus[]> = {
        active: ["paused", "finished"],
        paused: ["active", "finished"],
        finished: [],
    };

    if (!validTransitions[lot.status].includes(nextStatus)) {
        return false;
    }

    lots = lots.map((item) =>
        item.id === id
            ? { ...item, status: nextStatus }
            : item
    );

    notify();

    return true;
}