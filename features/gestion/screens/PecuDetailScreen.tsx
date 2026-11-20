import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

export default function PecuDetailScreen() {
    return (
        <GestionDetail  backRoute="/(tabs)/(inicio)/gestion/pecu">
            <Text>Detalle pecaurio</Text>
        </GestionDetail>
    );
}