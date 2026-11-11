
import { SvgXml } from "react-native-svg";

import { ACCUWEATHER_ICONS } from "@/features/weather/constants/accuweather-icons";

interface AccuWeatherIconProps {
    readonly icon: number;
    readonly size?: number;
}

export function AccuWeatherIcon({
    icon,
    size = 48,
}: AccuWeatherIconProps) {
    const svg = ACCUWEATHER_ICONS[icon];

    if (!svg) return null;

    return (
        <SvgXml
            xml={svg}
            width={size}
            height={size}
        />
    );
}