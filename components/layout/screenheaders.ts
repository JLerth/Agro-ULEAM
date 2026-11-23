export type ScreenHeader = {
    title: string;
    subtitle: string;
};

export const HEADER_ITEMS: ScreenHeader[] = [
    {
        title: "Agro ULEAM",
        subtitle: "Finca Universitaria",
    },
    {
        title: "Clima",
        subtitle: "Condiciones meteorológicas",
    },
    {
        title: "Panel",
        subtitle: "Seguimiento de la producción",
    },
    {
        title: "Configuración",
        subtitle: "Personalización de la aplicación",
    },
];

export const GESTION_HEADERS: Record<string, ScreenHeader> = {
    agro: {
        title: "Agrícola",
        subtitle: "Gestión agrícola",
    },
    pecu: {
        title: "Pecuaria",
        subtitle: "Gestión pecuaria",
    },
    vive: {
        title: "Viveros",
        subtitle: "Gestión viveros",
    },
    inve: {
        title: "Inventario",
        subtitle: "Gestión inventario",
    },
};

export const DETAIL_HEADERS: Record<string, ScreenHeader> = {
    agro: {
        title: "Detalles",
        subtitle: "Agrícola",
    },
    pecu: {
        title: "Detalles",
        subtitle: "Pecuaria",
    },
    vive: {
        title: "Detalles",
        subtitle: "Viveros",
    },
    inve: {
        title: "Detalles",
        subtitle: "Inventario",
    },
};