export interface StationDisplayConfig {
    showStationName: boolean;
    showLocation: boolean;
    showCustomName: boolean;
    customName: string;
}

export const DEFAULT_STATION_DISPLAY: StationDisplayConfig = {
    showStationName: true,
    showLocation: true,
    showCustomName: false,
    customName: "",
};