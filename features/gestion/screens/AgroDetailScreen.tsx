import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

export default function AgroDetailScreen() {
    return (
        <GestionDetail  backRoute="/(tabs)/(inicio)/gestion/agro">
            <Text>Detalle agrícola</Text>
        </GestionDetail>
    );
}