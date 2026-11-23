import { Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

import GestionDetail from "../components/gestionDetail";
import { agroLots } from "../data/agroLots";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function AgroDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const lot = agroLots.find((item) => item.id === id);
    return (
        <GestionDetail  
            backRoute="/(tabs)/(inicio)/gestion/agro"
            title={DETAIL_HEADERS.agro.title}
            subtitle={DETAIL_HEADERS.agro.subtitle}
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