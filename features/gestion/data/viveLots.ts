export type LotStatus = "active" | "paused" | "finished";

export type ViveLot = {
    id: string;
    status: LotStatus;
    title: string;      // para la tarjeta (species)
    subtitle: string;   // para la tarjeta
    quantity: number;
    entryDate: string;  // "YYYY-MM-DD"
    stage: string;      // "rootstock" | "unprocessed"
    responsible: string;
    createdAt: string;  // ISO
    observations?: string;
};

export const viveLots: ViveLot[] = [
];

export const VIVE_LOT_STATUS: Record<LotStatus, string> = {
    active: "Activo",
    paused: "Pausado",
    finished: "Finalizado",
};

export const VIVE_STAGE_LABELS: Record<string, string> = {
    rootstock: "Patrón",
    unprocessed: "Sin proceso",
};