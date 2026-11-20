import { Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { ChevronRight } from "lucide-react-native";

import { gestionStyles } from "../styles/gestion.styles";

type GestionCardProps = {
    readonly id: string;
    readonly status: string;
    readonly title: string;
    readonly subtitle: string;
    readonly icon: React.ReactNode;
    readonly onPress: () => void;
};

export default function GestionCard({
    id,
    status,
    title,
    subtitle,
    icon,
    onPress,
}: GestionCardProps) {
    return (
        <Pressable onPress={onPress}>
            <View style={gestionStyles.cardContainer}>
                {/* Primera fila: ID y estado */}
                <View style={gestionStyles.cardHeader}>
                    <Text>{id}</Text>
                    <Text>{status}</Text>
                </View>

                {/* Segunda fila: icono, información y flecha */}
                <View style={gestionStyles.cardContent}>
                    {icon}

                    <View style={gestionStyles.cardInfo}>
                        <Text>{title}</Text>
                        <Text>{subtitle}</Text>
                    </View>

                    <ChevronRight size={20} color="#999" />
                </View>
            </View>
        </Pressable>
    );
}