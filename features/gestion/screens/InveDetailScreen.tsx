import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

export default function InveDetailScreen() {
    return (
        <GestionDetail  backRoute="/(tabs)/(inicio)/gestion/inve">
            <Text>Detalle inventario</Text>
        </GestionDetail>
    );
}