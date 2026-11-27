type BaseLot<S extends string> = {
    id: string;
    status: S;
};

type Config<T extends BaseLot<S>, S extends string> = {
    initialLots: T[];
    idPrefix: string;
    validTransitions: Record<S, S[]>;
    initialStatus: S;
};

export function createLotsRepository<
    T extends BaseLot<S>,
    S extends string,
    TInput extends Omit<T, "id" | "status">,
>(config: Config<T, S>) {
    let lots: T[] = [...config.initialLots];
    let nextNumber = lots.length + 1;
    const listeners = new Set<() => void>();

    const notify = () => listeners.forEach((l) => l());

    const generateId = () => {
        const id = `${config.idPrefix}-${String(nextNumber).padStart(3, "0")}`;
        nextNumber += 1;
        return id;
    };

    return {
        getAll: () => lots,

        getById: (id: string) => lots.find((lot) => lot.id === id),

        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },

        create: (input: TInput): T => {
            const newLot = {
                ...input,
                id: generateId(),
                status: config.initialStatus,
            } as unknown as T;

            lots = [newLot, ...lots];
            notify();
            return newLot;
        },

        updateStatus: (id: string, nextStatus: S): boolean => {
            const lot = lots.find((item) => item.id === id);
            if (!lot) return false;

            if (!config.validTransitions[lot.status].includes(nextStatus)) {
                return false;
            }

            lots = lots.map((item) =>
                item.id === id ? { ...item, status: nextStatus } : item,
            );
            notify();
            return true;
        },
    };
}