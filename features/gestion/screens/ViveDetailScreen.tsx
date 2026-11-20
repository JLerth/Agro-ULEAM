import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

export default function ViveDetailScreen() {
    return (
        <GestionDetail  backRoute="/(tabs)/(inicio)/gestion/vive">
            <Text>Detalle vivero</Text>
        </GestionDetail>
    );
}