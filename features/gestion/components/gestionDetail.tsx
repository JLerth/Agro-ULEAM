import { Pressable } from "react-native";
import { router, type Href } from "expo-router";
import { Text, View } from "@/components/Themed";
import { ArrowLeft } from "lucide-react-native";

import { detailStyles } from "../styles/detail.styles";

type GestionDetailProps = {
    readonly backRoute: Href;
    readonly children: React.ReactNode;
};

export default function GestionDetail({
    backRoute,
    children,
}: GestionDetailProps) {
    return (
        <View style={detailStyles.container}>
            {/* Sección superior */}
            <View style={detailStyles.topSection}>
                <Pressable
                    onPress={() => router.replace(backRoute)}
                    style={detailStyles.backButton}
                >
                    <ArrowLeft size={20} color="#999" />
                    <Text>Regresar</Text>
                </Pressable>
            </View>

            {/* Separador */}
            <View style={detailStyles.divider} />

            {/* Contenido */}
            <View style={detailStyles.contentSection}>
                {children}
            </View>
        </View>
    );
}