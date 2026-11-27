import { createLotsRepository } from "./createLotsRepository";
import { viveLots, type ViveLot, type LotStatus } from "../data/viveLots";

export type NewViveLotInput = Omit<ViveLot, "id" | "status">;

export const viverosRepository = createLotsRepository<
    ViveLot,
    LotStatus,
    Omit<ViveLot, "id" | "status">
>({
    initialLots: viveLots,
    idPrefix: "LOT",
    initialStatus: "active",
    validTransitions: {
        active: ["paused", "finished"],
        paused: ["active", "finished"],
        finished: [],
    },
});

// Para no tocar el resto de tu código, mantienes los mismos nombres:
export const getViverosLots = viverosRepository.getAll;
export const getViveroLotById = viverosRepository.getById;
export const subscribeViverosLots = viverosRepository.subscribe;
export const createViveroLot = viverosRepository.create;
export const updateViveroLotStatus = viverosRepository.updateStatus;