import { Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

import GestionDetail from "../components/gestionDetail";
import { pecuLots } from "../data/pecuLots";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function PecuDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const lot = pecuLots.find((item) => item.id === id);
    return (
        <GestionDetail  
            backRoute="/(tabs)/(inicio)/gestion/pecu"
            title={DETAIL_HEADERS.pecu.title}
            subtitle={DETAIL_HEADERS.pecu.subtitle}
        >
            {lot ? (
                <Text>
                    {lot.id} - {lot.title}
                </Text>
            ) : (
                <Text>No se encontró el registro</Text>
            )}
        </GestionDetail>
    );
}