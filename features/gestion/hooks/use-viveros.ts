// hooks/use-viveros.ts
import { useLots } from "./use-lots";
import { viverosRepository } from "../repositories/viverosLotsRepository";

export function useViveros() {
    return useLots(viverosRepository);
}