import { MODULES, type ModuleKey } from "@/constants/modules";

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
        subtitle: "Seguimiento",
    },
    {
        title: "Configuración",
        subtitle: "Personalización",
    },
];

export const GESTION_HEADERS = Object.fromEntries(
    Object.values(MODULES).map((module) => [
        module.key,
        {
            title: module.name,
            subtitle: `Gestión ${module.name.toLowerCase()}`,
        },
    ]),
) as Record<ModuleKey, ScreenHeader>;

export const DETAIL_HEADERS = Object.fromEntries(
    Object.values(MODULES).map((module) => [
        module.key,
        {
            title: "Detalles",
            subtitle: module.name,
        },
    ]),
) as Record<ModuleKey, ScreenHeader>;