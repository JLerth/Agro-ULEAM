import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function InveDetailScreen() {
    return (
        <GestionDetail  
            backRoute="/(tabs)/(inicio)/gestion/inve"
            title={DETAIL_HEADERS.inve.title}
            subtitle={DETAIL_HEADERS.inve.subtitle}
        >
            <Text>Detalle inventario</Text>
        </GestionDetail>
    );
}