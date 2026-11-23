import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function PecuDetailScreen() {
    return (
        <GestionDetail  
            backRoute="/(tabs)/(inicio)/gestion/pecu"
            title={DETAIL_HEADERS.pecu.title}
            subtitle={DETAIL_HEADERS.pecu.subtitle}
        >
            <Text>Detalle pecaurio</Text>
        </GestionDetail>
    );
}