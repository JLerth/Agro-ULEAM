export type LotStatus = "active" | "paused" | "finished";

export type ViveLot = {
    id: string;
    status: LotStatus;
    title: string;
    subtitle: string;
};

export const viveLots: ViveLot[] = [
    {
        id: "LOT-001",
        status: "active",
        title: "Café",
        subtitle: "Lote de producción",
    },
    {
        id: "LOT-002",
        status: "active",
        title: "Banano",
        subtitle: "Lote de producción",
    },
];

export const VIVE_LOT_STATUS: Record<LotStatus, string> = {
    active: "Activo",
    paused: "Pausado",
    finished: "Finalizado",
};