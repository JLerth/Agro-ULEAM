import { Leaf, PawPrint, Sprout, Package, type LucideIcon } from "lucide-react-native";

export type ModuleKey = "agro" | "pecu" | "vive" | "inve";

export type ModuleInfo = {
    key: ModuleKey;
    name: string;
    icon: LucideIcon;
    route: "/gestion/agro" | "/gestion/pecu" | "/gestion/vive" | "/gestion/inve";
};

export const MODULES: Record<ModuleKey, ModuleInfo> = {
    agro: { key: "agro", name: "Agrícola", icon: Leaf,     route: "/gestion/agro" },
    pecu: { key: "pecu", name: "Pecuaria", icon: PawPrint, route: "/gestion/pecu" },
    vive: { key: "vive", name: "Viveros", icon: Sprout,   route: "/gestion/vive" },
    inve: { key: "inve", name: "Inventario", icon: Package,  route: "/gestion/inve" },
};

export function isModuleKey(value: string | undefined): value is ModuleKey {
    return value !== undefined && value in MODULES;
}

export const MODULE_LIST = Object.values(MODULES);