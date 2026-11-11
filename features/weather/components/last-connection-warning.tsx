import { TriangleExclamationPoint } from "lucide-react-native";

import { Text } from "@/components/Themed";

interface LastConnectionWarningProps {
    readonly visible: boolean;
}

export function LastConnectionWarning({
    visible,
}: LastConnectionWarningProps) {
    if (!visible) return null;

    return (
        <Text>
            <TriangleExclamationPoint color="#ffa50a" size={16} />
            Datos de la última conexión
        </Text>
    );
}