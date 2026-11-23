import { Text } from "@/components/Themed";

import GestionDetail from "../components/gestionDetail";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function AgroDetailScreen() {
    return (
        <GestionDetail  
        backRoute="/(tabs)/(inicio)/gestion/agro"
        title={DETAIL_HEADERS.agro.title}
        subtitle={DETAIL_HEADERS.agro.subtitle}
        >
            <Text>Detalle agrícola</Text>
        </GestionDetail>
    );
}